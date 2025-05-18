import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Surface, TextInput } from "react-native-paper";

// Import the NativeWind styled components
import { styled } from "nativewind/styled";

// Create styled components for React Native Paper components
const StyledSurface = styled(Surface);
const StyledTextInput = styled(TextInput);
const StyledView = styled(View);
const StyledText = styled(Text);

// Define theme colors to match existing app
const theme = {
  dark: "#0F0F13",
  surface: "#1A1A22",
  accent: "#36F1CD",
  accentLight: "#36F1CD40",
  accentBright: "#36F1CD",
  text: "#FFFFFF",
  textSecondary: "#A0A0B2",
  cardBackground: "#1E1E28",
  success: "#36F1CD",
  warning: "#FFD166",
  error: "#EF476F",
  info: "#118AB2",
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-900"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StyledView className="flex-1 justify-center py-10">
          <StyledSurface className="bg-white dark:bg-gray-800 rounded-lg mx-6 p-6 shadow-md">
            <StyledText className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Welcome Back
            </StyledText>

            <StyledTextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              className="mb-4"
              mode="outlined"
            />

            {/* ... other components ... */}
          </StyledSurface>

          {/* Sign Up Container */}
          <StyledView className="flex-row justify-center mt-4">
            <StyledText className="text-gray-600 dark:text-gray-400 text-sm">
              Do not have an account?
            </StyledText>
            <StyledText className="text-blue-500 font-semibold text-sm ml-1">
              Sign up
            </StyledText>
          </StyledView>
        </StyledView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
