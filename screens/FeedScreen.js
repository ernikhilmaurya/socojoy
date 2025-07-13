import { View, ScrollView } from "react-native";
import React from "react";
import FeedHeader from "../components/FeedHeader";
import SearchBar from "../components/SearchBar";
import HandPickedCarousel from "../components/HandPickedCarousel";
import LiveEventsSection from "../components/LiveEventsSection";
import PopularChefsSection from "../components/PopularChefsSection";
import BestRecipesSection from "../components/BestRecipesSection";
import ChefsSpecialSection from "../components/ChefsSpecialSection";
import FoodCategories from "../components/FoodCategories";

export default function FeedScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingTop: 16 }}
    >
      <FeedHeader
        username="Tokami"
        avatarUri="https://randomuser.me/api/portraits/women/44.jpg"
      />
      <View style={{ paddingHorizontal: 16 }}>
        <SearchBar placeholder="Find your flavor" />
      </View>
      <HandPickedCarousel />
      <PopularChefsSection />
      <LiveEventsSection />
      <BestRecipesSection />
      <ChefsSpecialSection />
      <FoodCategories />
    </ScrollView>
  );
}
