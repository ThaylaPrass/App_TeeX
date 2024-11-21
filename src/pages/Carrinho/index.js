import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Alert
} from 'react-native';

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

    const diminuirQuantidade = (produtoId) => {
        setCarrinho((prevCarrinho) => {
            const itemExistente = prevCarrinho.find((item) => item.produtoId === produtoId);

            if (itemExistente && itemExistente.quantidade > 1) {
                return prevCarrinho.map((item) =>
                    item.produtoId === produtoId
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                );
            } else {
                return prevCarrinho.filter((item) => item.produtoId !== produtoId);
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
        axios.post('http://localhost:3000/pedido-produtos', { itens: carrinho })
            .then(response => {
                Alert.alert('Compra Finalizada', 'Seu pedido foi realizado com sucesso!');
                limparCarrinho();
            })
            .catch(error => {
                console.error('Erro ao finalizar compra:', error);
            });
    };

}