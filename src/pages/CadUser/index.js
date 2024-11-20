import { Form } from '@unform/mobile';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { api_url, headers } from '../../variables';
import { Aviso, BoxForm, Container } from './styles';

export default function CadUser({ navigation }) {
  const formRef = useRef(null);
  const [Sev, setSev] = useState("error");
  const [Retorno, setRetorno] = useState("");
  const [FormValues, setFormValues] = useState([]);
  const [loading, setLoading] = useState(false); 

  function handleInputChange(input) {
    setFormValues((prevValues) => ({
      ...prevValues,
      [input.name]: input.value,
    }));
  }

  return (
    <Container>
      <StatusBar color="white" backgroundColor={"#5e849d"}/>
      <View style={styles.ViewInicial}>
        <BoxForm style={{ marginBottom: 0 }} >
          <Form ref={formRef} onSubmit={(e) => { Cadastrar() }}>
            <Text style={styles.LabelPadrao}>Nome</Text>
            <TextInput
              placeholder=''
              style={styles.InputPadrao}
              onChangeText={(e) => handleInputChange({ name: "nome", value: e })}
              value={FormValues.nome ? FormValues.nome : ""}
              name="Nome"
              required
              secureTextEntry={false}
            />

            <Text style={styles.LabelPadrao}>Email</Text>
            <TextInput
              placeholder=''
              style={styles.InputPadrao}
              onChangeText={(e) => handleInputChange({ name: "email", value: e })}
              value={FormValues.email ? FormValues.email : ""}
              name="Email"
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
                <Text style={styles.BotaoPadraoTexto}>Cadastrar</Text>
              </View>
            </TouchableOpacity>

            {
              loading ? 
                <ActivityIndicator
                  size="large"
                  color="#FFF"
                  style={{ marginBottom: 10, marginTop: 10 }}
                />
              : null
            }

            { Retorno !== "" ? 
              <Aviso sev={Sev}>
                <Text style={{ color: Sev === "error" ? "#f8d7da" : Sev === "success" ? "#d4edda" : "#d4e5ed", margin: 5 }}>
                  {Retorno}
                </Text>
              </Aviso>
            : null }
          </Form>
        </BoxForm>
      </View>
    </Container>
  );

  async function Cadastrar() {
    if (FormValues.email && FormValues.pass && FormValues.nome) {
      setLoading(true);

      let dados = FormValues;
      
      await axios.post(api_url+'user', dados, {
        headers: headers
      })
      .then((response) => {
        setLoading(false);
        setRetorno("");

        try {
          if(response.status === 201){
            setSev("success");
            setRetorno("Usuário criado com sucesso!");

            setTimeout(() => { setRetorno(""); navigation.navigate('Login'); }, 2500);
          } else {
            setSev("error");
            setRetorno("Erro ao cadastrar");
          }
        } catch (e) {
          console.log(e);
          setSev("error");
          setRetorno(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setRetorno("Erro ao cadastrar.");

        setTimeout(() => { setRetorno(""); }, 5000);
      });
    } else {
      setLoading(false);
      setRetorno("Preencha todos os campos");
    }
  }
}

const styles = StyleSheet.create({
  ViewInicial: {
    marginBottom: 10,
    marginTop: 10
  },
  TextBody: {
    color: "#fff",
    fontSize: 23,
    marginBottom: 5,
    textAlign: "center"
  },
  LabelPadrao: {
    color: "#fff",
    alignItems: 'center',
    margin: 5,
    fontWeight: 'bold', // Adicionando negrito
    fontSize: 18 // Aumentando o tamanho da fonte
  },
  BotaoPadrao: {
    backgroundColor: "#0d4c75",
    alignItems: 'center',
    padding: 15,
    margin: 5,
    borderRadius: 5
  },
  BotaoPadraoTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold', // Adicionando negrito
    textAlign: 'center' // Centralizando o texto
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
});
