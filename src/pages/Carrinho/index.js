import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Container } from './styles';

export default function Carrinho({ route, navigation }) {
  const { itensCarrinho = [] } = route.params || {};
  const [carrinho, setCarrinho] = useState(itensCarrinho);
  const [pagamento, setPagamento] = useState({
    numeroCartao: '',
    validade: '',
    cvv: '',
  });
  const [pixCode, setPixCode] = useState('');

  useEffect(() => {
    console.log('Itens recebidos no carrinho:', itensCarrinho);
    if (itensCarrinho.length > 0) {
      setCarrinho(itensCarrinho);
    }
  }, [itensCarrinho]);

  const handlePagamentoChange = (field, value) => {
    setPagamento({ ...pagamento, [field]: value });
  };

  const gerarPixCode = () => {
    // Gera o código Pix (isso é um exemplo, você precisará adaptar para seu backend)
    setPixCode('00020126410014br.gov.bcb.pix0114+55119999999970212Pagamento12345678000');
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    Alert.alert('Carrinho Limpo', 'Todos os itens foram removidos do carrinho.');
  };

  return (
    <Container>
      {carrinho.length === 0 ? (
        <Text>Seu carrinho está vazio.</Text>
      ) : (
        carrinho.map((item, index) => (
          <View key={index} style={styles.produtoItem}>
            <Image source={{ uri: item.produtoImagem }} style={styles.produtoImagem} />
            <View style={styles.produtoInfo}>
              <Text style={styles.produtoNome}>{item.produtoNome}</Text>
              <Text style={styles.produtoPreco}>Preço: R${item.valorTotal.toFixed(2)}</Text>
              <Text style={styles.produtoQuantidade}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.produtoTamanho}>Tamanho: {item.tamanho}</Text>
            </View>
          </View>
        ))
      )}

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
      <TouchableOpacity style={styles.botaoFinalizar} onPress={gerarPixCode}>
        <Text style={styles.botaoTexto}>Gerar QR Code para Pix</Text>
      </TouchableOpacity>
      {pixCode ? (
        <QRCode
          value={pixCode}
          size={200}
        />
      ) : null}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  produtoItem: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  produtoImagem: {
    width: 100,
    height: 130,
    marginRight: 10,
  },
  produtoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  produtoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  produtoPreco: {
    fontSize: 16,
    marginBottom: 10,
  },
  produtoQuantidade: {
    fontSize: 16,
    marginBottom: 10,
  },
  produtoTamanho: {
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