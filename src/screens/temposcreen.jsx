import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../config/styles";
import { useEffect } from "react";

const API_KEY = "19192600f70b22d9a5fcb409dbfb3741";
const CITY_NAME = "Joinville";

export default function TempoScreen() {
    useEffect(() => {
        const fetchTempo = async() => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`

            try {
                const response = await axios.get(url);
                console.log(response.data);
            } catch (error) {
                console.error("erro", error);
            }
        };
        fetchTempo();

    }, []);

    return (
        <View style={styles.container} >
            <Text
                variant="bodyLarge" >
                Tempo em {CITY_NAME}
            </Text>
        </View>
    );
}