// /navigation/StackNavigator.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import OTPScreen from "../screens/OTPScreen";
import FeedScreen from "../screens/FeedScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import { ChefProfileScreen } from "../components/ChefProfileScreen";
import LiveEventScreen from "../components/LiveEventScreen";
import LiveEventsSection from "../components/LiveEventsSection";
import CuisineCategoryGrid from "../components/CuisineCategoryGrid";
import CategoryScreen from "../components/CategoryScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Recipe" component={RecipeDetailScreen} />
      <Stack.Screen name="ChefProfile" component={ChefProfileScreen} />
      <Stack.Screen name="LiveEvents" component={LiveEventsSection} />
      <Stack.Screen name="LiveEvent" component={LiveEventScreen} />
      <Stack.Screen name="Categories" component={CuisineCategoryGrid} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack.Navigator>
  );
}
