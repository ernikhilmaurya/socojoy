import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACER_WIDTH = (width - ITEM_WIDTH) / 2;

const data = [
  {
    id: "1",
    title: "Green Smoothie",
    kcal: "230 kcal",
    image: "https://picsum.photos/200?random=1",
  },
  {
    id: "2",
    title: "Immunity Booster",
    kcal: "150 kcal",
    image: "https://picsum.photos/200?random=2",
  },
  {
    id: "3",
    title: "Skin Glow Lemonade",
    kcal: "120 kcal",
    image: "https://picsum.photos/200?random=3",
  },
];

const VIRTUAL_LENGTH = 10000;
const DATA_LENGTH = data.length;
const INITIAL_INDEX = Math.floor(VIRTUAL_LENGTH / 2);

export default function CustomCarousel() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getActualIndex = (virtualIndex) => virtualIndex % DATA_LENGTH;

  const handleMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    setCurrentIndex(getActualIndex(index));
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current.scrollToIndex({
        index: INITIAL_INDEX,
        animated: false,
      });
      setCurrentIndex(getActualIndex(INITIAL_INDEX));
    }, 100);
  }, []);

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.heading}>Handpicked for You</Text>

      <Animated.FlatList
        ref={flatListRef}
        data={Array.from(
          { length: VIRTUAL_LENGTH },
          (_, i) => data[i % data.length]
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ paddingHorizontal: SPACER_WIDTH }}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.kcal}>{item.kcal}</Text>
            </View>
          );
        }}
      />

      <View style={styles.pagination}>
        {data.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, currentIndex === idx && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F3C2E",
    marginLeft: 16,
    marginBottom: 12,
  },
  card: {
    width: ITEM_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 5,
    alignItems: "center",
    padding: 12,
    elevation: 4,
    marginVertical: 12,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F3C2E",
  },
  kcal: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#ccc",
    borderRadius: 4,
    margin: 4,
  },
  activeDot: {
    backgroundColor: "#1F3C2E",
  },
});
