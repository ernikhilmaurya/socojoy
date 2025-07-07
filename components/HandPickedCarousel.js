import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
} from "react-native-reanimated";

const { width: viewportWidth } = Dimensions.get("window");
const CARD_WIDTH = viewportWidth * 0.7; // adjust if needed
const CARD_HEIGHT = 250;

const data = [
  {
    id: "1",
    title: "Healthy Green Smoothie",
    subtitle: "With spinach and banana",
    kcal: "230 kcal",
    image: "https://picsum.photos/200?random=1",
  },
  {
    id: "2",
    title: "Immunity Booster",
    subtitle: "Made with ginger and orange",
    kcal: "150 kcal",
    image: "https://picsum.photos/200?random=2",
  },
  {
    id: "3",
    title: "Skin Glow Lemonade",
    subtitle: "Organic lemon and turmeric",
    kcal: "120 kcal",
    image: "https://picsum.photos/200?random=3",
  },
];

export default function HandpickedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Handpicked for You</Text>
      <Carousel
        loop
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        data={data}
        scrollAnimationDuration={800}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: "left",
          stackInterval: 20,
          scaleInterval: 0.1,
          opacityInterval: 0.15,
        }}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item, animationValue }) => {
          const animatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              animationValue.value,
              [-1, 0, 1],
              [0.9, 1, 0.9],
              Extrapolate.CLAMP
            );
            return { transform: [{ scale }] };
          }, [animationValue]);

          return (
            <Animated.View style={[styles.card, animatedStyle]}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.kcal}>{item.kcal}</Text>
            </Animated.View>
          );
        }}
      />
      <View style={styles.dotsRow}>
        {data.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, idx === activeIndex ? styles.activeDot : null]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F3C2E",
    marginLeft: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F3C2E",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  kcal: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#1F3C2E",
  },
});
