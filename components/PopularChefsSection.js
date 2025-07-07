import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons"; // for verified badge icon

const chefs = [
  {
    id: "1",
    name: "Edwards",
    followers: "1.2M Followers",
    image: "https://picsum.photos/100?random=11",
    verified: true,
  },
  {
    id: "2",
    name: "Webb",
    followers: "1.2M Followers",
    image: "https://picsum.photos/100?random=12",
    verified: true,
  },
  {
    id: "3",
    name: "John",
    followers: "1.2M Followers",
    image: "https://picsum.photos/100?random=13",
    verified: false,
  },
  {
    id: "4",
    name: "Cooper",
    followers: "1.2M Followers",
    image: "https://picsum.photos/100?random=14",
    verified: true,
  },
  {
    id: "5",
    name: "Carter",
    followers: "1.2M Followers",
    image: "https://picsum.photos/100?random=15",
    verified: false,
  },
];

export default function PopularChefsSection() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Popular Chefs</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={chefs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => (
          <View style={styles.chefCard}>
            {/* Gradient ring */}
            <LinearGradient
              colors={["#FFD700", "#FF8C00", "#FF0080"]} // gold to orange-pink
              style={styles.gradientRing}
            >
              <Image source={{ uri: item.image }} style={styles.avatar} />
              {item.verified && (
                <View style={styles.badge}>
                  <MaterialIcons name="verified" size={12} color="#4DA6FF" />
                </View>
              )}
            </LinearGradient>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.followers}>{item.followers}</Text>
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
  chefCard: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 80,
  },
  gradientRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 1,
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
  },
  followers: {
    fontSize: 10,
    color: "#777",
  },
});
