import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ChefProfileScreen = ({ route, navigation }) => {
  const { chef } = route.params;

  // Recipes data with images
  const recipes = [
    {
      id: "1",
      name: "Classic Carbonara",
      time: "30 min",
      image: "https://picsum.photos/300/200?random=1",
    },
    {
      id: "2",
      name: "Tuscan Ribollita",
      time: "45 min",
      image: "https://picsum.photos/300/200?random=2",
    },
    {
      id: "3",
      name: "Lemon Herb Chicken",
      time: "60 min",
      image: "https://picsum.photos/300/200?random=3",
    },
    {
      id: "4",
      name: "Chocolate Lava Cake",
      time: "25 min",
      image: "https://picsum.photos/300/200?random=4",
    },
  ];

  const numColumns = 2;
  const screenWidth = Dimensions.get("window").width;
  const cardMargin = 5;
  const cardWidth = (screenWidth - cardMargin * (numColumns + 8)) / numColumns;

  const RecipeCard = ({ recipe }) => (
    <View style={[styles.recipeCard, { width: cardWidth, margin: cardMargin }]}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName} numberOfLines={1}>
          {recipe.name}
        </Text>
        <View style={styles.recipeTimeContainer}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.recipeTime}>{recipe.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          {chef.image ? (
            <Image
              source={{ uri: chef.image }}
              style={styles.chefImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.chefImage, styles.placeholderImage]}>
              <Ionicons name="person" size={50} color="#ccc" />
            </View>
          )}
          <Text style={styles.chefName}>{chef.name}</Text>

          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>
              {chef.isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{chef.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {chef.recipes || recipes.length}
              </Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{chef.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          <Text style={styles.bioText}>
            {chef.bio || "This chef hasn't added a bio yet."}
          </Text>
        </View>

        <View style={styles.recipesSection}>
          <Text style={styles.sectionTitle}>Chefs Recipes</Text>

          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={numColumns}
            key={`flatlist-${numColumns}`}
            contentContainerStyle={styles.recipeListContainer}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 15,
  },
  profileSection: {
    alignItems: "center",
  },
  chefImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  placeholderImage: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  chefName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  followButton: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
    minWidth: 80,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  bioText: {
    textAlign: "center",
    color: "#333",
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  recipesSection: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    paddingLeft: 10,
  },
  recipeListContainer: {
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  recipeImage: {
    width: "100%",
    height: 120,
  },
  recipeInfo: {
    padding: 5,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  recipeTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recipeTime: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
});
