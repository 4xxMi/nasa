import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import styles from "../config/style";
import { Image } from "expo-image";


// useEffect (function a (parametro_a){}); //rodando incessantemente
// useEffect ((parametro_a)=>{});

// useEffect(function b(parametro_b){}, [])// roda apenas qunaod comp for montado
// useEffect(function b(parametro_b){},  [temperatura]) // roda quando a variavel mudar

const API_KEY = "19192600f70b22d9a5fcb409dbfb3741";
const URL = `https://api.openweathermap.org/data/2.5/weather?q=Joinville&appid=${API_KEY}&units=metric`

export default function tempoScreenAula() {
    const [temperatura, setTemperatura] = useState("");
    const [icone, SetIcone] = useState("");
    const [cidade, setCidade] = useState ("");

    const fetchTempo = async () => {
        //vou ali buscar o json na net
        const resposta = await fetch(URL);
        //recebe a info e converte em programação tipo json
        const data = await resposta.json();

        console.log(resposta); // formtato tecto
        console.log(data); // convertido pro json 
        setTemperatura(data.main);
        SetIcone(data.weather[0].icon);
    };

    useEffect(() => {
        fetchTempo();
    }, []); //fehou a chave do useeffect e passou um array [] vazio
    // array vazio = só vai ser executado uma vez (quando for montado

    return (

        <View style={styles.container}>
            {icone && (
                <>
                <Text 
                variant="displayMedium"
                style={{ textAlign: "center", marginVertical: 10 }}
                > 
                Temperatura em joinvas 
                </Text>
            
            
                <Image
                source = {{
                    uri: `https://openweathermap.org/img/wn/${icone}@2x.png`,
                }}
                style = {{width: 100, height: 100, backgroundColor: "white", borderRadius: 200,}}
                /></>
            )}

            <Text variant="bodyLarge"> infors </Text>
            <Text> Temperatura atual: {temperatura?.temp} </Text>
            <Text> Temperatura Máxima: {temperatura?.temp_max} </Text>
            <Text> Temperatura Mínima: {temperatura?.temp_min} </Text>
        </View>
    );
}