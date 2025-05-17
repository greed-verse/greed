import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Button
        mode="contained"
        onPress={() => router.replace("/(tabs)/home")}
        buttonColor="blue"
      >
        Get Started
      </Button>
    </View>
  );
}
