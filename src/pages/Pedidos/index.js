import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, Picker, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://localhost:3000/pedido-produtos';

export default function Pedidos({ route, navigation }) {
  const { produtoId, produtoImagem } = route.params;
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanho, setTamanho] = useState('P');

  const valorProduto = 99.99;
  const valorTotal = valorProduto * quantidade;

  const adicionarAoCarrinho = async () => {
    try {
      const novoPedido = {
        produtoId,
        produtoNome: 'Camiseta TeeX Arte de Rua Unissex',
        quantidade,
        endereco: 'Rua Exemplo, 123',
        tamanho,
      };

      await axios.post(API_URL, novoPedido);
      Alert.alert('Pedido Criado', 'O pedido foi adicionado com sucesso!');

      const novoItem = { ...novoPedido, valorTotal };
      setItensCarrinho(prevItens => [...prevItens, novoItem]);

      console.log('Adicionado ao carrinho:', novoItem);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o pedido.');
    }
  };

  const navegarParaCarrinho = () => {
    console.log('Navegando para Carrinho com itensCarrinho:', itensCarrinho);
    navigation.navigate('Carrinho', { itensCarrinho });
  };

  const adicionarEIrParaCarrinho = async () => {
    await adicionarAoCarrinho();
    navegarParaCarrinho();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Camiseta TeeX Arte de Rua Unissex</Text>

      <Image source={{ uri: produtoImagem }} style={styles.imagemGrande} />

      <Text style={styles.valorProduto}>R${valorProduto.toFixed(2)}</Text>

      <View style={styles.quantidadeContainer}>
        <TouchableOpacity onPress={() => setQuantidade(Math.max(1, quantidade - 1))}>
          <Text style={styles.quantidadeBotao}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantidadeTexto}>{quantidade}</Text>
        <TouchableOpacity onPress={() => setQuantidade(quantidade + 1)}>
          <Text style={styles.quantidadeBotao}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tamanhoContainer}>
        <Text style={styles.selecioneTamanho}>Escolha seu tamanho:</Text>
        <Picker
          selectedValue={tamanho}
          style={styles.picker}
          onValueChange={(itemValue) => setTamanho(itemValue)}
        >
          <Picker.Item label="P" value="P" />
          <Picker.Item label="M" value="M" />
          <Picker.Item label="G" value="G" />
          <Picker.Item label="GG" value="GG" />
        </Picker>
      </View>

      <Text style={styles.valorTotal}>Valor Total: R${valorTotal.toFixed(2)}</Text>

      <TouchableOpacity style={styles.botaoCarrinho} onPress={adicionarEIrParaCarrinho}>
        <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>

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
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantidadeBotao: {
    fontSize: 20,
    padding: 10,
    backgroundColor: '#f4a261',
    color: '#fff',
    borderRadius: 5,
  },
  quantidadeTexto: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#fff',
  },
  tamanhoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selecioneTamanho: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  picker: {
    height: 40, // Reduced height
    width: 100,
    color: '#fff',
    backgroundColor: '#f4a261',
  },
  valorTotal: {
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
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  voltarTexto: {
    color: '#fff',
    marginTop: 20,
  },
});