import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

const categories = [
  { id: "1", name: "Pasta", image: "https://picsum.photos/200?random=41" },
  { id: "2", name: "Pizza", image: "https://picsum.photos/200?random=42" },
  { id: "3", name: "Biryani", image: "https://picsum.photos/200?random=43" },
  { id: "4", name: "Coffee", image: "https://picsum.photos/200?random=44" },
  { id: "5", name: "Salad", image: "https://picsum.photos/200?random=45" },
];

export default function FoodCategories() {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <View style={styles.shadowWrapper}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
  },
  shadowWrapper: {
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // for Android
    marginBottom: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "cover",
  },
  name: {
    fontSize: 12,
    color: "#333",
  },
});
