import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const specials = [
  {
    id: "1",
    title: "Keto Avocado Salad",
    chef: "@Varun",
    image: "https://picsum.photos/200?random=31",
  },
  {
    id: "2",
    title: "Cold-Pressed Green Juice",
    chef: "@Anita",
    image: "https://picsum.photos/200?random=32",
  },
  {
    id: "3",
    title: "Protein Power Bowl",
    chef: "@Ravi",
    image: "https://picsum.photos/200?random=33",
  },
];

export default function ChefsSpecialSection() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>CHEF’S SPECIALS</Text>
      <Text style={styles.subheading}>
        Handpicked by our Head Chef from the Public Space Community
      </Text>

      {/* Specials */}
      <FlatList
        data={specials}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, marginTop: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            {/* Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>TRENDING ON PUBLIC SPACE</Text>
            </View>
            {/* Text */}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.chef}>Recipe by {item.chef}</Text>
            {/* Order Button */}
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderText}>ORDER</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: "#0d0903", // Dark background
    paddingVertical: 12,
  },
  heading: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
  },
  subheading: {
    color: "#ccc",
    fontSize: 12,
    marginLeft: 12,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    width: 160,
    marginRight: 12,
    padding: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#8B4513",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 8,
    color: "#fff",
    fontWeight: "600",
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  chef: {
    color: "#aaa",
    fontSize: 10,
    marginBottom: 6,
  },
  orderButton: {
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 4,
    alignItems: "center",
  },
  orderText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
});
