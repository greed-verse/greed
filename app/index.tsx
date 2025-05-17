import { useRouter } from "expo-router";
import { View } from "react-native";

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
    ></View>
  );
}
