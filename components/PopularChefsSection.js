import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types"; // Added for prop type checking

// Moved constants outside component for better organization
const CATEGORIES = ["All", "Vegan", "Veg", "Non-Veg"];

const INITIAL_CHEFS = [
  {
    id: "1",
    name: "Edwards",
    username: "@edwards_chef",
    followers: "1.2M",
    rank: "1",
    rating: 4.8,
    category: "Vegan",
    image: "https://picsum.photos/100?random=11",
    verified: true,
    isFollowing: false,
    specialty: [
      { name: "Michelin", icon: "award" },
      { name: "Trending", icon: "fire" },
    ],
  },
  {
    id: "2",
    name: "Webb",
    username: "@webb_foodie",
    followers: "980K",
    rank: "2",
    rating: 4.6,
    category: "Veg",
    image: "https://picsum.photos/100?random=12",
    verified: true,
    isFollowing: false,
    specialty: [{ name: "Top Rated", icon: "medal" }],
  },
  {
    id: "3",
    name: "John",
    username: "@john_cook",
    followers: "500K",
    rank: "5",
    rating: 4.2,
    category: "Non-Veg",
    image: "https://picsum.photos/100?random=13",
    verified: false,
    isFollowing: false,
    specialty: [{ name: "Trending", icon: "fire" }],
  },
  {
    id: "4",
    name: "Cooper",
    username: "@cooper_special",
    followers: "1.1M",
    rank: "3",
    rating: 4.7,
    category: "Veg",
    image: "https://picsum.photos/100?random=14",
    verified: true,
    isFollowing: false,
    specialty: [{ name: "Michelin", icon: "award" }],
  },
];

// Extracted StarRating component for better reusability
const StarRating = ({ rating, size = 12 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesome key={`full-${i}`} name="star" size={size} color="#FFD700" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FontAwesome
        key="half"
        name="star-half-empty"
        size={size}
        color="#FFD700"
      />
    );
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesome key={`empty-${i}`} name="star-o" size={size} color="#ccc" />
    );
  }

  return <View style={styles.starsContainer}>{stars}</View>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.number,
};

// Extracted ChefCard component for better readability
const ChefCard = ({ chef, onToggleFollow }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChefProfile", { chef })}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.followBtn, chef.isFollowing && styles.followingBtn]}
          onPress={(e) => {
            e.stopPropagation(); // Prevent the parent touchable from triggering
            onToggleFollow(chef.id);
          }}
        >
          <Text style={styles.followText}>
            {chef.isFollowing ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>

        <Image
          source={{ uri: chef.image }}
          style={styles.avatar}
          resizeMode="cover" // Added for better image handling
        />

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{chef.name}</Text>
            {chef.verified && (
              <MaterialIcons name="verified" size={16} color="#4DA6FF" />
            )}
          </View>
          <Text style={styles.username}>{chef.username}</Text>
          <Text style={styles.followers}>{chef.followers} followers</Text>
          <Text style={styles.rank}>Rank #{chef.rank}</Text>
          <StarRating rating={chef.rating} />

          <View style={styles.badgesRow}>
            {chef.specialty.map((badge, index) => (
              <View key={`${chef.id}-${index}`} style={styles.badge}>
                <FontAwesome5
                  name={badge.icon}
                  size={10}
                  color="#1F3C2E"
                  style={styles.badgeIcon}
                />
                <Text style={styles.badgeText}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ChefCard.propTypes = {
  chef: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    verified: PropTypes.bool,
    isFollowing: PropTypes.bool,
    specialty: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onToggleFollow: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

// Main component
export default function PopularChefsSection({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [chefs, setChefs] = useState(INITIAL_CHEFS);

  const toggleFollow = (id) => {
    setChefs((prev) =>
      prev.map((chef) =>
        chef.id === id ? { ...chef, isFollowing: !chef.isFollowing } : chef
      )
    );
  };

  const filteredChefs =
    selectedCategory === "All"
      ? chefs
      : chefs.filter((chef) => chef.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Popular Chefs</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategory,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredChefs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <ChefCard
            chef={item}
            onToggleFollow={toggleFollow}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F3C2E",
  },
  seeAll: {
    fontSize: 14,
    color: "#00A8E8",
  },
  categories: {
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 16,
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: "#1F3C2E",
  },
  categoryText: {
    fontSize: 12,
    color: "#333",
  },
  activeCategoryText: {
    color: "#fff",
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
  card: {
    flexDirection: "row",
    width: 280,
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 12,
    marginRight: 12,
    position: "relative",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    marginVertical: 2,
  },
  followBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#1F3C2E",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 1,
  },
  followingBtn: {
    backgroundColor: "#E6F4F1",
  },
  followText: {
    color: "#fff",
    fontSize: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F3C2E",
  },
  username: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  followers: {
    fontSize: 12,
    color: "#444",
  },
  rank: {
    fontSize: 12,
    color: "#1F3C2E",
    fontWeight: "500",
    marginTop: 2,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  badge: {
    backgroundColor: "#E6F4F1",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 11,
    color: "#1F3C2E",
  },
});
