import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const CategoryScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const recipes = [
    {
      id: "1",
      name: "Hearty Lentil Soup",
      time: "40 min",
      image: "https://picsum.photos/200/200?random=1",
    },
    {
      id: "2",
      name: "Spicy Tofu Stir-fry",
      time: "25 min",
      image: "https://picsum.photos/200/200?random=2",
    },
    {
      id: "3",
      name: "Creamy Vegan Pasta",
      time: "35 min",
      image: "https://picsum.photos/200/200?random=3",
    },
    {
      id: "4",
      name: "Chickpea Curry",
      time: "50 min",
      image: "https://picsum.photos/200/200?random=4",
    },
    {
      id: "5",
      name: "Vegan Burger",
      time: "30 min",
      image: "https://picsum.photos/200/200?random=5",
    },
    {
      id: "6",
      name: "Quinoa Salad",
      time: "20 min",
      image: "https://picsum.photos/200/200?random=6",
    },
  ];

  // Group recipes into pairs for the layout
  const recipePairs = [];
  for (let i = 0; i < recipes.length; i += 2) {
    recipePairs.push(recipes.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{category} Recipes</Text>
        <TouchableOpacity>
          <MaterialIcons name="filter-list" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Recipes List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {recipePairs.map((pair, index) => (
          <View key={index}>
            <View style={styles.recipeRow}>
              {pair.map((recipe) => (
                <View key={recipe.id} style={styles.recipeContainer}>
                  <Image
                    source={{ uri: recipe.image }}
                    style={styles.recipeImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.recipeName}>{recipe.name}</Text>
                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.recipeTime}>{recipe.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#333" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#333" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle" size={24} color="#FF6B6B" />
          <Text style={[styles.navText, styles.activeNavText]}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bookmark" size={24} color="#333" />
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#333" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  recipeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  recipeContainer: {
    width: "48%",
    backgroundColor: "#F2F2F2",
    borderRadius: 16,
  },
  recipeImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    paddingLeft: 4,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
    paddingBottom: 4,
  },
  recipeTime: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: "#333",
  },
  activeNavText: {
    color: "#FF6B6B",
  },
});

export default CategoryScreen;
