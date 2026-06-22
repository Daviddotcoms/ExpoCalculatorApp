import { Slot } from "expo-router";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { globalStyles } from "@/styles/globalStyles";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <View style={globalStyles.backgroundContainer}>
      <StatusBar style="light" />
      <Slot />
    </View>
  );
};

export default RootLayout;
