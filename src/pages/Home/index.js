import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container } from './styles';

export default function Home({ navigation }) {
  const [DadosUser, setDadosUser] = useState([]);

  useEffect(() => {
    // Simular busca de dados do usuário
    (async () => {
      let Token = await AsyncStorage.getItem('@token_').then((data) => {
        return data;
      });

      if (!Token) {
        Sair();
      } else {
        await AsyncStorage.getItem('@dados_').then((data) => {
          setDadosUser(JSON.parse(data));
        });
      }
    })();

    // Navegar para a página Produtos após 5 segundos
    const timer = setTimeout(() => {
      navigation.navigate('Produtos');
    }, 5000);

    // Limpar o timeout se o componente for desmontado antes dos 5 segundos
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Container>
      <StatusBar color="white" backgroundColor={"#5e849d"} />
      <View style={styles.ViewInicial}>
        {/* Texto grande com o nome TeeX */}
        <Text style={styles.TextTeeX}>TeeX</Text>

        {/* Texto menor com a descrição */}
        <Text style={styles.TextDescricao}>Fabricação e Venda de Camisetas</Text>

        <TouchableOpacity onPress={(e) => Sair()}>
          <View style={styles.BotaoLink}>
            <Text style={styles.BotaoPadraoTexto}>Deslogar</Text>
          </View>
        </TouchableOpacity>

      </View>
    </Container>
  );

  async function Sair() {
    let keys = ['@token_', '@dados_'];
    await AsyncStorage.multiRemove(keys, (err) => {
      navigation.navigate('Login');
    });
  }
}

const styles = StyleSheet.create({
  ViewInicial: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',  
  },
  TextTeeX: {
    color: "#fff",
    fontSize: 150, 
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  TextDescricao: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
    fontWeight: '300',  
    marginBottom: 40,  
  },
  BotaoPadraoTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold',
  },
  BotaoLink: {
    alignItems: 'center',
    padding: 15,
    margin: 5,
  },
});
