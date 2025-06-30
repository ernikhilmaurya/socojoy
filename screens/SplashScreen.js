import { Text, StyleSheet, ImageBackground } from "react-native";
import { useEffect } from "react";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/images/react-logo.png")}
      style={styles.container}
    >
      <Text style={styles.title}>Socojoy</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "#7D0F0F",
    fontWeight: "bold",
  },
});
