import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function FeedHeader({ username, avatarUri }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <View>
        <Text style={styles.greeting}>Hey {username},</Text>
        <Text style={styles.title}>Ready to cook?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // space below header
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  greeting: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F3C2E", // dark green like in design
  },
});
