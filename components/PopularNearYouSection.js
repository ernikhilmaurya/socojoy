import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");
const STORY_DURATION = 5000;

const dummyData = [
  {
    id: "1",
    title: "Avocado",
    stories: [
      { id: "a1", image: "https://picsum.photos/400?random=41" },
      { id: "a2", image: "https://picsum.photos/400?random=42" },
    ],
  },
  {
    id: "2",
    title: "Spinach",
    stories: [
      { id: "s1", image: "https://picsum.photos/400?random=43" },
      { id: "s2", image: "https://picsum.photos/400?random=44" },
    ],
  },
  {
    id: "3",
    title: "Avocado",
    stories: [
      { id: "a1", image: "https://picsum.photos/400?random=41" },
      { id: "a2", image: "https://picsum.photos/400?random=42" },
    ],
  },
  {
    id: "4",
    title: "Spinach",
    stories: [
      { id: "s1", image: "https://picsum.photos/400?random=43" },
      { id: "s2", image: "https://picsum.photos/400?random=44" },
    ],
  },
];

export default function PopularNearYouSection() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIngredientIndex, setCurrentIngredientIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  const ingredient = dummyData[currentIngredientIndex];
  const stories = ingredient?.stories || [];

  const startProgress = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) handleNextStory();
    });
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else if (currentIngredientIndex < dummyData.length - 1) {
      setCurrentIngredientIndex((prev) => prev + 1);
      setCurrentStoryIndex(0);
    } else {
      closeModal();
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    } else if (currentIngredientIndex > 0) {
      const prevIndex = currentIngredientIndex - 1;
      setCurrentIngredientIndex(prevIndex);
      setCurrentStoryIndex(dummyData[prevIndex].stories.length - 1);
    }
  };

  const openModal = (index) => {
    setCurrentIngredientIndex(index);
    setCurrentStoryIndex(0);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentStoryIndex(0);
    setCurrentIngredientIndex(0);
  };

  useEffect(() => {
    if (modalVisible) startProgress();
  }, [currentStoryIndex, currentIngredientIndex, modalVisible]);

  return (
    <>
      {/* Title above horizontal story scroll */}
      <Text style={styles.sectionTitle}>Popular Near You</Text>

      {/* Horizontal preview cards */}
      <FlatList
        horizontal
        data={dummyData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.storyCard}
            onPress={() => openModal(index)}
          >
            <Image
              source={{ uri: item.stories[0].image }}
              style={styles.image}
            />
            <Text style={styles.label}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Fullscreen Story View */}
      <Modal visible={modalVisible} animationType="fade" transparent={false}>
        <StatusBar hidden />

        <View style={styles.modalContainer}>
          {/* Background Story Image */}
          <Image
            source={{ uri: stories[currentStoryIndex].image }}
            style={styles.fullscreenImage}
          />

          {/* Timer Bars */}
          <View style={styles.progressContainer}>
            {stories.map((_, idx) => (
              <View key={idx} style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    idx === currentStoryIndex && {
                      width: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                      }),
                    },
                    idx < currentStoryIndex && { width: "100%" },
                  ]}
                />
              </View>
            ))}
          </View>

          {/* Ingredient Title at top-left */}
          <Text style={styles.storyTitle}>{ingredient.title}</Text>

          {/* Close button */}
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Tappable overlays for swipe navigation */}
          <View style={styles.overlayButtons}>
            <TouchableOpacity style={styles.left} onPress={handlePrevStory} />
            <TouchableOpacity style={styles.right} onPress={handleNextStory} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  storyCard: {
    alignItems: "center",
    marginRight: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#FF6347",
  },
  label: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: width,
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  progressContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    justifyContent: "space-between",
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 2,
    borderRadius: 3,
  },
  progressFill: {
    height: 3,
    backgroundColor: "#fff",
  },
  overlayButtons: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 16,
    padding: 10,
    zIndex: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  storyTitle: {
    position: "absolute",
    top: 70,
    left: 16,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
