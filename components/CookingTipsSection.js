import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";

const CARD_SIZE = Dimensions.get("window").width / 2 - 24;

export default function CookingTipsSection({ videoUri }) {
  const videoRef = useRef(null);

  const handleFullscreen = async () => {
    if (videoRef.current) {
      await videoRef.current.presentFullscreenPlayer();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>🍳 Cooking Tips</Text>
      </View>
      <TouchableOpacity onPress={handleFullscreen} activeOpacity={0.9}>
        <View style={styles.card}>
          <Video
            ref={videoRef}
            source={{ uri: videoUri }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted
            useNativeControls={false}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
  },
  headerRow: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
