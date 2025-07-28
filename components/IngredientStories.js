import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const CARD_SIZE = Dimensions.get("window").width - 100;
const CARD_WIDTH = CARD_SIZE;
const CARD_HEIGHT = CARD_SIZE;
const STORY_DURATION = 5000;

const dummyData = [
  {
    id: "1",
    title: "Avocado",
    image: "https://picsum.photos/400?random=51",
  },
  {
    id: "2",
    title: "Spinach",
    image: "https://picsum.photos/400?random=52",
  },
  {
    id: "3",
    title: "Blueberry",
    image: "https://picsum.photos/400?random=53",
  },
];

export default function IngredientStoryCard() {
  const [index, setIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  const ingredient = dummyData[index];

  const startProgress = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setIndex((prev) => (prev + 1) % dummyData.length);
      }
    });
  };

  useEffect(() => {
    startProgress();
  }, [index]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Ingredient of the Week</Text>

      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Image source={{ uri: ingredient.image }} style={styles.image} />
          <View style={styles.overlay}>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{ingredient.title}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  cardWrapper: {
    alignItems: "center", // centers the card horizontally
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  titleWrapper: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
