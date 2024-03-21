import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import styles from "../config/style";
import { useEffect, useState } from "react";

//useEffect = falecido addeventlistener

export default function HomeScreen({ }) {
  const navigation = useNavigation();


  //declaração de um estado / variavel elaborada
  const [contador, setContador] = useState(1); //usestate define uma variavel e cria um modificador - tal variavel recebe 1
 
  // função qulalquer q nao importa
  function mostraValorContador() {
    console.log(contador);
  }

  // cosnbtante coomo função mas faz a mesma coisa q a de cima
  const mostraValor = () => {
    console.log(contador)
  }

  // o joe de you atras da variavel
  useEffect(mostraValorContador, [contador]);
  useEffect(mostraValor, [contador]);

// faz o mesmo que as outras
  useEffect(() => {
    console.log("pleaase please please ley me get what i want");
  }, []);

  return (
    <View style={styles.container}>
      {/* note que aqui estamos usando o TEXT de Native Paper*/}
      {/* ele possui alguns props que podemos usar para melhorar a UI */}
      <Text variant="titleLarge">Inicial</Text>
      <Text variant="bodyMedium">Bem vindo</Text>
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 200, height: 200 }}
      />
      <Button
        onPress={() => setContador(contador + 1)}
        title="aumenta contador" />
    </View>
  );
}
