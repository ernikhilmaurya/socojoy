import { TextInput, StyleSheet } from "react-native";

export default function InputBox({
  placeholder,
  keyboardType,
  onChangeText,
  value,
  maxLength,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
      maxLength={maxLength}
      placeholderTextColor="#999"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1, // fill remaining space inside row
    fontSize: 16,
    color: "#333",
    paddingVertical: 12, // balanced padding
  },
});
