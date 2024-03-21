import { useEffect, useState } from "react";
import { Card, Text } from "react-native-paper";
import { View } from "react-native";
import axios from "axios";
import styles from "../config/style";

// useEffect (function a (parametro_a){}); //rodando incessantemente
// useEffect ((parametro_a)=>{});

// useEffect(function b(parametro_b){}, [])// roda apenas qunaod comp for montado
// useEffect(function b(parametro_b){},  [temperatura]) // roda quando a variavel mudar

const API_KEY = "19192600f70b22d9a5fcb409dbfb3741";
const CITY_NAME = "Joinville";

export default function tempoScreenAula() {
    const [tempoData, setTempoData] = useState(null);

    useEffect(() => {
        const fetchTempo = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`

            try {
                const response = await axios.get(url);
                console.log(response.data);

                setTempoData(response.data)// aqui a chave pro sucesso
            } catch (error) {
                console.error("erro", error);
            }
        };
        fetchTempo();

    }, []);

    return (
        <View style={styles.container}>
            <Text
                variant="bodyLarge">
                Tempo em {CITY_NAME}
            </Text>
            {tempoData && (
                <Card style={styles.card}>
                    <Card.Title title="Detalhes do tempo" />
                    <Card.Content>
                        <Text> Temperatura atual: {tempoData.main.temp} °C </Text>
                    </Card.Content>
                </Card>
            )}
        </View>
    );
}