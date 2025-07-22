import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function RecipeDetailScreen({ route, navigation }) {
  const recipe = route.params?.recipe;

  const recipeClips = [
    { id: "1", uri: "https://picsum.photos/200/300?random=1" },
    { id: "2", uri: "https://picsum.photos/200/300?random=2" },
    { id: "3", uri: "https://picsum.photos/200/300?random=3" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe?.image }}
            style={styles.recipeImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{recipe?.title}</Text>
          <Text style={styles.chef}>{recipe?.chef}</Text>

          {/* Info Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Ionicons name="time-outline" size={18} color="#666" />
              <Text style={styles.infoText}>{recipe?.time}</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="flame-outline" size={18} color="#666" />
              <Text style={styles.infoText}>{recipe?.calories}</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="people-outline" size={18} color="#666" />
              <Text style={styles.infoText}>{recipe?.serving} servings</Text>
            </View>
          </View>

          {/* Ingredients */}
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientGrid}>
            {recipe?.ingredients?.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* How to Cook */}
          <Text style={styles.sectionTitle}>How to Cook</Text>
          <View style={styles.stepsWrapper}>
            {recipe?.steps?.split("\n").map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.stepText}>
                  {step.replace(/^\d+\.\s*/, "")}
                </Text>
              </View>
            ))}
          </View>

          {/* Additional Info */}
          <Text style={styles.sectionTitle}>Additional Info</Text>
          <Text style={styles.additionalInfo}>
            This recipe is high in protein and perfect for a weeknight dinner.
          </Text>

          {/* Recipe Clips */}
          <Text style={styles.sectionTitle}>Recipe Clips</Text>
          <FlatList
            horizontal
            data={recipeClips}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
              <Image source={{ uri: item.uri }} style={styles.clipImage} />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageContainer: {
    width: "100%",
    height: width * 0.75,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  chef: {
    fontSize: 14,
    color: "#666",
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginVertical: 10,
  },
  ingredientGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  ingredientItem: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ingredientText: {
    fontSize: 13,
    color: "#444",
  },
  stepsWrapper: {
    gap: 12,
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#00A8E8",
    textAlign: "center",
    lineHeight: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  additionalInfo: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    lineHeight: 20,
  },
  clipImage: {
    width: 120,
    height: 80,
    borderRadius: 12,
  },
});
