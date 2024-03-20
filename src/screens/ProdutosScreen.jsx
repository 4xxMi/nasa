import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { ScrollView } from "react-native-web";
import styles from "../config/style";

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);

  const fetchCategories = async () => {
    const categorias = await fetch("https://dummyjson.com/products/categories");
    const retorno = await categorias.json();
    setCategorias(retorno);
    console.log(retorno);
  };

  // aqui usamos o hook useEffect para ser executado
  // toda vez que o componente de tela é montado
  useEffect(
    () => {
      // assim que temos a tela Produtos vamos buscar os
      // produtos chamando a função fetchProducts
      fetchProducts();
      fetchCategories();
    },
    [] // o array vazio indica que a função será executada apenas uma vez, quando o componente for montado
  );

  // aqui fizemos uma anon function dentro de um constante
  // ela é assíncrona pois fetch retorna uma promessa
  const fetchProducts = async () => {
    let url = "";
    // aqui temos a resposta aguardando o fetch
    if (categoria != "") {
      url = `https://dummyjson.com/products/category/${categoria}`;
    } else {
      url = "https://dummyjson.com/products";
    }
    const response = await fetch(url);
    // quando a promessa é resolvida temos o texto recebido
    // este texto precisa tentar ser convertido pra json
    const data = await response.json();
    console.log(data.products);

    // por fim dizemos a variável produtos que ela receba todos os produtos
    setProdutos(await data.products);
  };

  return (
    <View style={styles.container}>
      {/* note que aqui estamos usando o TEXT de Native Paper*/}
      {/* ele possui alguns props que podemos usar para melhorar a UI */}
      <Text variant="titleLarge">Produtos</Text>
      <Text variant="bodyMedium">Confira a lista de produtos</Text>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {categorias.map((cat) => (
            <Button key={cat}
              onPress={() => setCategoria(cat)}
              mode="contained"
            >
              {cat}
            </Button>
          ))}
          <Button onPress={() => setCategoria("")}> Limpar Filtros </Button>
        </View>



        {
          // aqui criamos uma condicional dentro da exibição do componente
          // para fazer isso abrimos { } e dentro perguntamos
          // a quantidade de produtos é zero? Se sim mostre carregando
          produtos.length === 0 ? (
            <Text>Carregando...</Text>
          ) : (
            // se não vamos percorrer o array de produtos
            // função map para percorrer o array de produtos e exibir o nome de cada um
            // a função map retorna um novo array com o resultado da função passada para cada item do array
            produtos.map((produto) => (
              <View key={produto.id} style={styles.selfStrech}>
                {/*  exibindo a imagem do produto */}
                <Image
                  // a propriedade source recebe um objeto com a propriedade uri que recebe a URL da imagem
                  source={{ uri: produto.images[0] }}
                  // a propriedade style recebe um objeto com as propriedades width, maxWidth e height
                  style={{ width: "100%", maxWidth: 350, height: 50 }}
                />
                <Text>{produto.title}</Text>
              </View>
            ))
          )
        }
      </ScrollView >
    </View>
  );
}
