import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content" // dark icons/text for light backgrounds
        backgroundColor="#fff" // Android status bar background
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
