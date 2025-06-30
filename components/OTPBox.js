import { View, TextInput, StyleSheet } from "react-native";

export default function OTPBox({ value, onChangeText, refs }) {
  return (
    <View style={styles.container}>
      {Array(6)
        .fill("")
        .map((_, i) => (
          <TextInput
            key={i}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={value[i]}
            onChangeText={(text) => onChangeText(text, i)}
            ref={(el) => (refs.current[i] = el)}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  input: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#fff",
  },
});
