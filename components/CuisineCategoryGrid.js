import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const CARD_SIZE = (windowWidth - 16 * 2 - 12 * 3) / 4; // 4 columns with gaps and padding

export default function CuisineCategoryGrid() {
  const navigation = useNavigation();
  const sections = [
    {
      title: "Cuisine Type",
      data: [
        { title: "Indian", image: "https://picsum.photos/200?random=41" },
        { title: "Chinese", image: "https://picsum.photos/200?random=42" },
        { title: "Italian", image: "https://picsum.photos/200?random=43" },
        { title: "Mexican", image: "https://picsum.photos/200?random=44" },
        { title: "Thai", image: "https://picsum.photos/200?random=45" },
        { title: "Korean", image: "https://picsum.photos/200?random=46" },
        { title: "French", image: "https://picsum.photos/200?random=47" },
        { title: "Japanese", image: "https://picsum.photos/200?random=48" },
      ],
    },
    {
      title: "Meal Type",
      data: [
        { title: "Breakfast", image: "https://picsum.photos/200?random=49" },
        { title: "Lunch", image: "https://picsum.photos/200?random=50" },
        { title: "Snacks", image: "https://picsum.photos/200?random=51" },
        { title: "Dinner", image: "https://picsum.photos/200?random=52" },
        { title: "Brunch", image: "https://picsum.photos/200?random=53" },
        { title: "Supper", image: "https://picsum.photos/200?random=54" },
        { title: "Late Night", image: "https://picsum.photos/200?random=55" },
        { title: "Tea Time", image: "https://picsum.photos/200?random=56" },
      ],
    },
    {
      title: "Diet Type",
      data: [
        { title: "Vegan", image: "https://picsum.photos/200?random=57" },
        { title: "Keto", image: "https://picsum.photos/200?random=58" },
        { title: "Low Carb", image: "https://picsum.photos/200?random=59" },
        { title: "High Protein", image: "https://picsum.photos/200?random=60" },
        { title: "Paleo", image: "https://picsum.photos/200?random=61" },
        { title: "Gluten Free", image: "https://picsum.photos/200?random=62" },
        { title: "Diabetic", image: "https://picsum.photos/200?random=63" },
        { title: "Detox", image: "https://picsum.photos/200?random=64" },
      ],
    },
  ];

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CategoryScreen", {
          category: item.title,
          categoryType: "Diet", // You can pass different types based on section
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.label}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => (
        <View key={index} style={{ marginBottom: 24 }}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <FlatList
            data={section.data.slice(0, 8)} // Only 2 rows of 4
            keyExtractor={(item, i) => `${section.title}-${i}`}
            renderItem={renderCard}
            numColumns={4}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            scrollEnabled={false}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  card: {
    width: CARD_SIZE,
    alignItems: "center",
  },
  image: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
});
