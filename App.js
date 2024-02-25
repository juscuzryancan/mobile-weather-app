import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView } from "react-native-web";

export default function App() {
  const [dailyForecast, setDailyForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(dailyForecast);

  const handleLoad = async () => {
    const API_URL = `https://api.weather.gov/gridpoints/LOX/155,38/forecast`;
    setLoading(true);
    try {
      const {
        data: {
          properties: { periods },
        },
      } = await axios.get(API_URL);
      setDailyForecast(periods);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <View style={styles.container}>
      <Text>Weather App</Text>
      <ScrollView horizontal style={styles.weatherContainer}>
        {dailyForecast.map((forecast) => {
          return (
            <div style={styles.weatherCard} key={forecast.number}>
              <Text>{forecast.name}</Text>
              <Text>{forecast.temperature}</Text>
              <img src={forecast.icon} />
            </div>
          );
        })}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    width: "100vw",
    flex: 1,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherContainer: {
    display: "flex",
    gap: "1rem",
  },
  weatherCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    height: "200px",
    width: "200px",
    borderRadius: "5px",
  },
});
