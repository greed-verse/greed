import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/(unauth)/login")}>
      <Text>Go to Home</Text>
    </TouchableOpacity>
  );
}
