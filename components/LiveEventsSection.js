import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or use Feather, FontAwesome etc.

const { width } = Dimensions.get("window");

const events = [
  {
    id: "1",
    title: "Celebrities without makeup (part 2)",
    thumbnail: "https://picsum.photos/200?random=4",
    userProfile: "https://picsum.photos/50?random=14",
  },
  {
    id: "2",
    title: "Kindness at Peak!",
    thumbnail: "https://picsum.photos/200?random=5",
    userProfile: "https://picsum.photos/50?random=15",
  },
  {
    id: "3",
    title: "Funny Market Moments",
    thumbnail: "https://picsum.photos/200?random=6",
    userProfile: "https://picsum.photos/50?random=16",
  },
  // add more...
];

export default function LiveEventsSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live Events</Text>
      <FlatList
        data={events}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

            {/* Play icon overlay */}
            <View style={styles.playIconContainer}>
              <Ionicons name="play-circle" size={36} color="#fff" />
            </View>

            {/* Live badge */}
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>

            {/* User profile bottom center */}
            <View style={styles.userProfileContainer}>
              <Image
                source={{ uri: item.userProfile }}
                style={styles.userProfile}
              />
            </View>

            {/* Bottom overlay text */}
            <View style={styles.overlay}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const CARD_WIDTH = width * 0.32;
const CARD_HEIGHT = 180;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 12,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 8,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 4,
    backgroundColor: "#222",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playIconContainer: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },
  liveBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#E02020",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  liveText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  userProfileContainer: {
    position: "absolute",
    bottom: 24,
    left: "50%",
    marginLeft: -15, // half of size to center horizontally
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
  },
  userProfile: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
});
