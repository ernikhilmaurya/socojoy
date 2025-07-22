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
import { useNavigation } from "@react-navigation/native";

const recipes = [
  {
    id: "1",
    title: "One-Pot Salsa Verde Shrimp & Rice",
    chef: "By Devon Lane",
    image: "https://picsum.photos/200/200?random=21",
    time: "30 mins",
    calories: "400 kcal",
    serving: "2",
    description: "A delicious shrimp dish with salsa verde and rice.",
    ingredients: [
      "1 lb shrimp",
      "1 cup rice",
      "1 cup salsa verde",
      "1 onion",
      "1 tbsp olive oil",
    ],
    steps:
      "1. Sauté onion in olive oil.\n2. Add shrimp and cook until pink.\n3. Add rice and salsa verde.\n4. Simmer for 20 mins.",
  },
  {
    id: "2",
    title: "Green Chile Enchiladas",
    chef: "By Devon Lane",
    image: "https://picsum.photos/200/200?random=22",
    time: "45 mins",
    calories: "500 kcal",
    serving: "4",
    description: "Cheesy enchiladas with green chile sauce.",
    ingredients: [
      "8 tortillas",
      "1 cup green chile sauce",
      "2 cups cheese",
      "1 onion",
      "1 tbsp olive oil",
    ],
    steps:
      "1. Cook onion in oil.\n2. Fill tortillas with cheese and onion.\n3. Roll and place in dish.\n4. Cover with sauce and bake.",
  },
  {
    id: "3",
    title: "Pasta Primavera",
    chef: "By Devon Lane",
    image: "https://picsum.photos/200/200?random=23",
    time: "35 mins",
    calories: "380 kcal",
    serving: "3",
    description: "Colorful pasta with fresh seasonal vegetables.",
    ingredients: [
      "200g pasta",
      "1 zucchini",
      "1 bell pepper",
      "1/2 cup cream",
      "Parmesan cheese",
    ],
    steps:
      "1. Boil pasta.\n2. Sauté vegetables.\n3. Mix with cream and cheese.\n4. Toss with pasta.",
  },
];

export default function BestRecipesSection() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Best Recipes</Text>
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
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Recipe", { recipe: item })}
          >
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
          </TouchableOpacity>
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
