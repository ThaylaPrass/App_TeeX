import axios from 'axios'; // Importando axios para requisições HTTP
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const API_URL = 'http://localhost:3000/pedido-produtos'; // URL base da API

export default function Pedidos({ route, navigation }) {
  const { produtoId, produtoImagem } = route.params; // Recebe os parâmetros da navegação
  const [carrinho, setCarrinho] = useState([]);
  const [pedidos, setPedidos] = useState([]); // Para armazenar os pedidos do backend

  const valorProduto = 99.99; // Valor do produto (pode ser dinâmico)

  // Função para adicionar um pedido na API
  const criarPedido = async () => {
    try {
      const novoPedido = {
        produtoId,
        produtoNome: 'Camiseta TeeX Arte de Rua Unissex',
        quantidade: 1, // Ajuste conforme necessário
        endereco: 'Rua Exemplo, 123',
      };

      const response = await axios.post(API_URL, novoPedido);
      Alert.alert('Pedido Criado', 'O pedido foi adicionado com sucesso!');
      listarPedidos(); // Atualiza a lista de pedidos
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar o pedido.');
    }
  };

  // Função para listar pedidos da API
  const listarPedidos = async () => {
    try {
      const response = await axios.get(API_URL);
      setPedidos(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os pedidos.');
    }
  };

  // Função para excluir um pedido da API
  const excluirPedido = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      Alert.alert('Pedido Excluído', `O pedido ${id} foi removido com sucesso.`);
      listarPedidos(); // Atualiza a lista de pedidos
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível excluir o pedido.');
    }
  };

  // Função para carregar pedidos na inicialização
  useEffect(() => {
    listarPedidos();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Camiseta TeeX Arte de Rua Unissex</Text>

      <Image
        source={{ uri: produtoImagem }}
        style={styles.imagemGrande}
      />

      <Text style={styles.valorProduto}>R${valorProduto.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.botaoCarrinho}
        onPress={criarPedido} // Chama a função para criar pedido
      >
        <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.pedidoContainer}>
            <Text style={styles.pedidoTexto}>
              {item.produtoNome} - {item.status || 'Pendente'}
            </Text>
            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirPedido(item.id)} // Exclui o pedido pelo ID
            >
              <Text style={styles.botaoTexto}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5e849d',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  imagemGrande: {
    width: 400,
    height: 400,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  valorProduto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  botaoCarrinho: {
    backgroundColor: '#f4a261',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  botaoExcluir: {
    backgroundColor: '#e76f51',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  voltarTexto: {
    color: '#fff',
    marginTop: 20,
  },
  pedidoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  pedidoTexto: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
});
