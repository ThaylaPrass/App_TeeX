import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Container } from './styles';

export default function Carrinho({ route, navigation }) {
  const { itensCarrinho } = route.params || [];
  const [carrinho, setCarrinho] = useState(itensCarrinho);

  const [pagamento, setPagamento] = useState({
    numeroCartao: '',
    validade: '',
    cvv: '',
  });

  useEffect(() => {
    console.log('Itens recebidos no carrinho:', itensCarrinho);
    if (itensCarrinho.length > 0) {
      setCarrinho(itensCarrinho);
    }
  }, [itensCarrinho]);

  const finalizarCompra = () => {
    axios.post('http://localhost:3000/pedido-produtos', { itens: carrinho })
      .then(response => {
        Alert.alert('Compra Finalizada', 'Seu pedido foi realizado com sucesso!');
        limparCarrinho();
      })
      .catch(error => {
        console.error('Erro ao finalizar compra:', error);
        Alert.alert('Erro', 'Não foi possível finalizar a compra.');
      });
  };

  const handlePagamentoChange = (field, value) => {
    setPagamento({ ...pagamento, [field]: value });
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    Alert.alert('Carrinho Limpo', 'Todos os itens foram removidos do carrinho.');
  };

  return (
    <Container>
      <Text style={styles.header}>Carrinho:</Text>
      {carrinho.length === 0 ? (
        <Text>Seu carrinho está vazio.</Text>
      ) : (
        carrinho.map((item, index) => (
          <View key={index} style={styles.produtoItem}>
            <Text style={styles.produtoNome}>{item.produtoNome}</Text>
            <Text style={styles.produtoPreco}>Preço: R${item.valorTotal.toFixed(2)}</Text>
            <Text style={styles.produtoQuantidade}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.produtoTamanho}>Tamanho: {item.tamanho}</Text> {/* Added size information */}
          </View>
        ))
      )}
      <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarCompra}>
        <Text style={styles.botaoTexto}>Finalizar Compra</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Pagamento:</Text>
      <TextInput
        style={styles.input}
        placeholder="Número do Cartão"
        value={pagamento.numeroCartao}
        onChangeText={(value) => handlePagamentoChange('numeroCartao', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Validade"
        value={pagamento.validade}
        onChangeText={(value) => handlePagamentoChange('validade', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={pagamento.cvv}
        onChangeText={(value) => handlePagamentoChange('cvv', value)}
        secureTextEntry
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  produtoItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  produtoNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  produtoPreco: {
    fontSize: 16,
    marginBottom: 10,
  },
  produtoQuantidade: {
    fontSize: 16,
    marginBottom: 10,
  },
  produtoTamanho: {  // Added style for size information
    fontSize: 16,
    marginBottom: 10,
  },
  botaoFinalizar: {
    backgroundColor: '#098387',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
});