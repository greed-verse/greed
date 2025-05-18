import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Surface, TextInput } from "react-native-paper";

// Define theme colors to match existing app
const theme = {
  dark: "#0F0F13",
  surface: "#1A1A22",
  accent: "#36F1CD", // Primary green (more teal, modern)
  accentLight: "#36F1CD40", // Light teal with opacity
  accentBright: "#36F1CD", // Bright teal for highlights
  text: "#FFFFFF",
  textSecondary: "#A0A0B2",
  cardBackground: "#1E1E28",
  success: "#36F1CD",
  warning: "#FFD166",
  error: "#EF476F",
  info: "#118AB2",
  purple: "#7B5EA7",
};

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Mock login functionality
    setTimeout(() => {
      setLoading(false);
      // Navigate to home screen after successful login
      if (navigation) {
        navigation.navigate("Home");
      }
    }, 1500);
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={theme.dark} />

          {/* Logo and App Name */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/BlueClearLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Greed</Text>
          </View>

          {/* Login Form */}
          <Surface style={styles.formCard}>
            <Text style={styles.formTitle}>Welcome Back</Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: theme.accent,
                  background: theme.surface,
                  text: theme.text,
                  placeholder: theme.textSecondary,
                },
              }}
              left={
                <TextInput.Icon
                  icon="email-outline"
                  color={theme.textSecondary}
                />
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: theme.accent,
                  background: theme.surface,
                  text: theme.text,
                  placeholder: theme.textSecondary,
                },
              }}
              left={
                <TextInput.Icon
                  icon="lock-outline"
                  color={theme.textSecondary}
                />
              }
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                  color={theme.textSecondary}
                  onPress={toggleSecureEntry}
                />
              }
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              mode="contained"
              onPress={() => router.push("/(tabs)/home")}
              style={styles.loginButton}
              contentStyle={styles.loginButtonContent}
              loading={loading}
              theme={{
                colors: {
                  primary: theme.accent,
                },
              }}
              labelStyle={styles.loginButtonLabel}
            >
              Login
            </Button>

            {/* Social Login Options */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons
                  name="google"
                  size={20}
                  color={theme.text}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons
                  name="facebook"
                  size={20}
                  color={theme.text}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons
                  name="apple"
                  size={20}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
          </Surface>

          {/* Sign Up Section */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>No account?</Text>
            <TouchableOpacity>
              <Text style={styles.signupButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  logo: {
    width: 175,
    height: 175,
  },
  appName: {
    color: theme.text,
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  tagline: {
    color: theme.textSecondary,
    fontSize: 14,
    letterSpacing: 0.5,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  formTitle: {
    color: theme.text,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  input: {
    marginBottom: 16,
    backgroundColor: theme.surface,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: theme.accent,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  loginButton: {
    borderRadius: 12,
    marginBottom: 24,
  },
  loginButtonContent: {
    height: 50,
  },
  loginButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: theme.dark,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  dividerText: {
    color: theme.textSecondary,
    fontSize: 12,
    fontWeight: "500",
    paddingHorizontal: 10,
    letterSpacing: 0.5,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signupText: {
    color: theme.textSecondary,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  signupButton: {
    color: theme.accent,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginLeft: 5,
  },
});
