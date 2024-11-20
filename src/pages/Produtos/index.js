import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Container } from './styles';

export default function Produtos({ navigation }) {
  const [DadosUser, setDadosUser] = useState([]);

  useEffect(() => {
    setDadosUser({ nome: 'Usuário Exemplo' });
  }, []);

  // Lista de produtos com imagens
  const produtos = [
    { id: 1, nome: '1', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1830,h=992,fit=crop,trim=53.737609329446066;0;158.9737609329446;0/YKbonqzRM6U1RQwB/caveira-moda-streetwear-camisetas-grafite-arte-urbana-skate-rock-caverik-rap-rua-12-Aq2N7eWDG6HnErlj.jpg' } },
    { id: 2, nome: '2', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=920,fit=crop/YKbonqzRM6U1RQwB/caveira-moda-streetwear-camisetas-grafite-arte-urbana-skate-rock-caverik-rap-rua-9-mnl5jnbOj5h9oV7b.jpg' } },
    { id: 3, nome: '3', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=912,fit=crop/YKbonqzRM6U1RQwB/cel-caveira-moda-streetwear-camisetas-arte-urbana-skate-rock-caverik-pixo-mP47pqkeZks2prvK.png' } },
    { id: 4, nome: '4', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=920,fit=crop/YKbonqzRM6U1RQwB/camisa-caverik-art-012-mp8XrQR3wBIb64kB.png' } },
    { id: 5, nome: '5', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=912,fit=crop/YKbonqzRM6U1RQwB/caveira-moda-streetwear-camisetas-grafite-arte-urbana-skate-rock-caverik-rap-rua-7-A0xrJe9Zy2heRjpv.jpg' } },
    { id: 6, nome: '6', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=448,h=623,fit=crop,trim=374.50422195416166;231.8266253869969;84.7092882991556;209.53560371517025/YKbonqzRM6U1RQwB/skull-caveira-moda-streetwear-camisetas-preta-arte-urbana-skate-rock-caverik-rap-rua-6-m2Wr9PD93yh1ZpJV.png' } },
    { id: 7, nome: '7', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=920,fit=crop/YKbonqzRM6U1RQwB/caveira-moda-streetwear-camisetas-grafite-arte-urbana-skate-rock-caverik-rap-rua-2-A3QrXa9boMUwv2v0.jpg' } },
    { id: 8, nome: '8', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=912,fit=crop/YKbonqzRM6U1RQwB/skull-caveira-moda-streetwear-camisetas-preta-arte-urbana-skate-rock-caverik-rap-rua-5-A85r9lBzkvU4JG3e.png' } },
    { id: 9, nome: '9', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=920,fit=crop/YKbonqzRM6U1RQwB/cel-caveira-moda-streetwear-camisetas-arte-urbana-skate-rock-caverik-loja-Aq26BO7ZpNhwpbZV.png' } },
    { id: 10, nome: '10', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=912,fit=crop/YKbonqzRM6U1RQwB/caverik-skull-caveira-camisa-sergioastral-02-m2WBrZxvxOCQwlg8.jpeg' } },
    { id: 11, nome: '11', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=920,fit=crop/YKbonqzRM6U1RQwB/skull-caveira-moda-streetwear-camisetas-preta-arte-urbana-skate-rock-caverik-rap-camiseta-m6LDB7rR6pHJJopd.png' } },
    { id: 12, nome: '12', imagem: { uri: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=920,fit=crop/YKbonqzRM6U1RQwB/skull-caveira-moda-streetwear-camisetas-preta-arte-urbana-skate-rock-caverik-rap-show-m2WlZnrV03u2xr7q.png' } },
  ];

  const screenWidth = Dimensions.get('window').width; // Obter a largura da tela

  return (
    <Container>
      <StatusBar color="white" backgroundColor={"#5e849d"} />
      <ScrollView>
        <View style={styles.ViewInicial}>
          <Text style={styles.TextBody}>
            Veja alguns de nossos produtos
          </Text>

          <View style={styles.ProdutosContainer}>
            {produtos.map((produto) => {
              return (
                <TouchableOpacity 
                  key={produto.id} 
                  onPress={() => {
                    // Passando o ID do produto para a tela 'Pedidos'
                    navigation.navigate('Pedidos', { 
                      produtoId: produto.id, 
                      produtoNome: produto.nome,
                      produtoImagem: produto.imagem.uri 
                    });
                  }}
                  style={styles.ProdutoItem}
                >
                  <Image 
                    source={produto.imagem} 
                    style={[styles.ProdutoImagem, { width: screenWidth / 2.8 }]} // Aumento ligeiro da largura
                  />
                </TouchableOpacity>
              );
            })}
          </View>
      
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.BotaoLink}>
              <Text style={styles.BotaoPadraoTexto}>Voltar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  ViewInicial: {
    marginBottom: 10,
    marginTop: 10
  },
  TextBody: {
    color: "#fff",
    fontSize: 50, // Tamanho maior da frase
    marginBottom: 20, // Maior espaçamento abaixo
    marginTop: 20, // Adicionando espaçamento antes das imagens
    textAlign: "center",
    fontWeight: 'bold',
  },
  ProdutosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 30, // Adicionando um espaçamento antes das imagens
  },
  ProdutoItem: {
    margin: 10,
  },
  ProdutoImagem: {
    height: 200,  // Aumento da altura da imagem
    marginBottom: 10,
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
