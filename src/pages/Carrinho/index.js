import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles'; 

export default function Carrinho({ navigation }) {
    const [carrinho, setCarrinho] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        // Fetch products from the API
        axios.get('http://seu-servidor.com/produtos')
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
    }, []);

    const adicionarAoCarrinho = (produto) => {
        setCarrinho((prevCarrinho) => {
            const itemExistente = prevCarrinho.find((item) => item.produtoId === produto.produtoId);

            if (itemExistente) {
                return prevCarrinho.map((item) =>
                    item.produtoId === produto.produtoId
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            } else {
                return [...prevCarrinho, { ...produto, quantidade: 1 }];
            }
        });
    };

    const removerDoCarrinho = (produtoId) => {
        setCarrinho((prevCarrinho) =>
            prevCarrinho.filter((item) => item.produtoId !== produtoId)
        );
    };

    const limparCarrinho = () => {
        setCarrinho([]);
        Alert.alert('Carrinho Limpo', 'Todos os itens foram removidos do carrinho.');
    };

    const calcularTotal = () => {
        return carrinho.reduce(
            (total, item) => total + item.valorProduto * item.quantidade,
            0
        ).toFixed(2);
    };

    const finalizarCompra = () => {
        axios.post('http://seu-servidor.com/pedidos', { itens: carrinho })
            .then(response => {
                Alert.alert('Compra Finalizada', 'Seu pedido foi realizado com sucesso!');
                limparCarrinho();
            })
            .catch(error => {
                console.error('Erro ao finalizar compra:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Carrinho de Compras</Text>

            <FlatList
                data={carrinho}
                keyExtractor={(item) => item.produtoId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemDescricao}>{item.descricao}</Text>
                        <Text>Preço: R${item.valorProduto.toFixed(2)}</Text>
                        <Text>Quantidade: {item.quantidade}</Text>
                        <View style={styles.botoesQuantidade}>
                            <TouchableOpacity
                                style={styles.botaoAlterar}
                                onPress={() => adicionarAoCarrinho(item)}
                            >
                                <Text>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.botaoAlterar}
                                onPress={() => removerDoCarrinho(item.produtoId)}
                            >
                                <Text>-</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.botaoRemover}
                            onPress={() => removerDoCarrinho(item.produtoId)}
                        >
                            <Text style={styles.botaoTexto}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Text style={styles.total}>Total: R${calcularTotal()}</Text>

            <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarCompra}>
                <Text style={styles.botaoTexto}>Finalizar Compra</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.voltarTexto}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}