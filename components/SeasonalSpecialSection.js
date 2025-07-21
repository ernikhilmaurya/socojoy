import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // for heart icon

const recipes = [
  {
    id: "1",
    title: "One-Pot Salsa Verde Shrimp & Rice",
    chef: "By Devon Lane",
    image: "https://picsum.photos/200/200?random=21",
  },
  {
    id: "2",
    title: "Green Chile Enchiladas",
    chef: "By Devon Lane",
    image: "https://picsum.photos/200/200?random=22",
  },
  {
    id: "3",
    title: "Pasta Primavera",
    chef: "By Devon Lane",
    image: "https://picsum.photos/200/200?random=23",
  },
];

export default function SeasonalSpecialSection() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Seasonal Special</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe cards */}
      <FlatList
        data={recipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            {/* Overlay */}
            <View style={styles.overlay} />
            {/* Heart icon */}
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={16} color="#fff" />
            </TouchableOpacity>
            {/* Text */}
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.chef}>{item.chef}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAll: {
    fontSize: 14,
    color: "#00A8E8",
  },
  card: {
    width: 160,
    height: 180,
    borderRadius: 12,
    marginHorizontal: 6,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  heartIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
    padding: 4,
  },
  textContainer: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  chef: {
    color: "#ddd",
    fontSize: 10,
    marginTop: 2,
  },
});
