import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form } from '@unform/mobile';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text, TextInput, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { api_url, headers } from '../../variables';
import { Aviso, BoxForm, Container } from './styles';

export default function Login({ navigation }) {
  const formRef = useRef(null);
  const [Sev, setSev] = useState("error");
  const [RetornoLogin, setRetornoLogin] = useState("");
  const [FormValues, setFormValues] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    (async () => {
      let Token = await AsyncStorage.getItem('@token_').then((data) => {
        return data;
      });

      if(Token) {
        navigation.navigate('Home');
      }
    })();
  }, []);

  function handleInputChange(input) {
    setFormValues((prevValues) => ({
      ...prevValues,
      [input.name]: input.value,
    }));
  }

  return (
    <Container>
      <StatusBar color="white" backgroundColor={"#5e849d"}/>
      <BoxForm style={{  marginBottom: 0 }} >
        <Form ref={formRef} onSubmit={(e) => { Logar() }}> 
          <Text style={styles.LabelPadrao}>Usuário</Text>
          <TextInput
            placeholder=''
            style={styles.InputPadrao}
            onChangeText={(e) => handleInputChange({ name: "email", value: e })}
            value={FormValues.email ? FormValues.email : ""}
            name="User"
            required
            secureTextEntry={false}
          />

          <Text style={styles.LabelPadrao}>Senha</Text>
          <TextInput
            placeholder=''
            style={styles.InputPadrao}
            onChangeText={(e) => handleInputChange({ name: "pass", value: e })}
            value={FormValues.pass ? FormValues.pass : ""}
            name="senha"
            secureTextEntry={true}
            autoCorrect={true}
            required
          />

          <TouchableOpacity onPress={(e) => formRef.current.submitForm()}>
            <View style={styles.BotaoPadrao}>
              <Text style={styles.BotaoPadraoTexto}>Entrar</Text> 
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={(e) => navigation.navigate('CadUser') }>
            <View style={styles.BotaoLink}>
              <Text style={styles.BotaoPadraoTexto}>Não tem um usuário? Click aqui.</Text> 
            </View>
          </TouchableOpacity>

          {
            loading ?
              <ActivityIndicator
                size="large"
                color="#FFF"
                style={{ marginBottom: 10, marginTop: 10 }}
              />
            :
            null
          }

          { RetornoLogin !== "" ?
            <Aviso sev={ Sev }>
              <Text style={{ color: Sev === "error" ? "#f8d7da": Sev === "success" ? "#d4edda" : "#d4e5ed", margin: 5 }}>
                { RetornoLogin }
              </Text>
            </Aviso>
          : null }
        </Form>
      </BoxForm>
    
      <View style={styles.footer}>
        <View style={styles.Rodape}>
          <View style={styles.RodapeLine}><View></View></View>
          <View style={styles.rodapeMeio}><Text style={styles.txtRodape}>TeeX</Text></View>
          <View style={styles.RodapeLine}><View></View></View>
        </View>
      </View>
              
  </Container>
  );

  async function Logar() {
    if(FormValues.email && FormValues.pass ) {
      setLoading(true);
      await axios.post(api_url+'user/login', FormValues, {
        headers: headers
      })
      .then((response) => {
        setLoading(false);
        setRetornoLogin("");

        try {
          (async () => {
            if(response.status == 200){
              response = response.data;
              console.log(response)

              AsyncStorage.setItem('@token_', response.token);
              AsyncStorage.setItem('@dados_', JSON.stringify(response.user));

              setSev("success");
              setRetornoLogin("Seja bem vindo "+response.user.nome);

              setTimeout(() => {
                setRetornoLogin(""); setFormValues([]); navigation.navigate('Home');
              }, 2500);
            }else{
              setSev("error");
              setRetornoLogin("Erro ao logar");
            }
          })();
        } catch (e) {
          console.log(e)
          setSev("error");
          setRetornoLogin(response.data);
        }
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        setRetornoLogin("Erro ao logar.");

        setTimeout(() => { setRetornoLogin(""); }, 5000);
      })
    }else{
      setSev("error")
      setRetornoLogin("Preencha usuário e senha")
    }
  }
}

const styles = StyleSheet.create({
  LabelPadrao: {
    color: "#fff",
    alignItems: 'center',
    margin: 5,
    fontWeight: 'bold', 
  },
  BotaoPadrao: {
    backgroundColor: "#0d4c75",
    alignItems: 'center',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  BotaoPadraoTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 'bold',
  },
  BotaoLink: {
    alignItems: 'center',
    padding: 15,
    margin: 5,
  },
  InputPadrao: {
    backgroundColor: "#fff",
    color: "#0d4c75",
    borderWidth: 1,
    borderColor: "#0d4c75",
    borderRadius: 5,
    margin: 5,
    padding: 10
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 25,
  },
  Rodape: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  RodapeLine: {
    borderBottomWidth: 2,
    borderColor: "#fff",
    width: '25%',
    height: 12
  },
  txtRodape: {
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 5,
    fontSize: 16
  },
  RodapeMeio: {
    width: '25%'
  },
});