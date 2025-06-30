import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4B0B0C",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
