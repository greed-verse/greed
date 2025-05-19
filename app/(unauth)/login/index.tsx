import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
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

const BACKEND_URL = "http://localhost:8080";

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

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const loginUrl = `${BACKEND_URL}/auth/google/login`;

    const listener = Linking.addEventListener("url", async (event) => {
      const url = event.url;
      const tokenParam = Linking.parse(url).queryParams?.token;

      if (tokenParam) {
        const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
        await AsyncStorage.setItem("jwt", token);
        listener.remove();
        router.push("/(tabs)/home");
      }
    });

    await Linking.openURL(loginUrl);
  };

  const handleAppleLogin = () => {
    setLoading(true);
    // Mock login functionality
    setTimeout(() => {
      setLoading(false);
      router.push("/(tabs)/home");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Modern Gradient Background */}
      <LinearGradient
        colors={["#1A1A30", "#0F0F13"]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Fun, Social Pattern Elements */}
      <View style={styles.patternElements}>
        {/* Floating elements that suggest social/party atmosphere */}
        <View style={[styles.floatingElement, styles.elementTop1]}>
          <MaterialCommunityIcons
            name="cards"
            size={24}
            color="rgba(54, 241, 205, 0.4)"
          />
        </View>
        <View style={[styles.floatingElement, styles.elementTop2]}>
          <MaterialCommunityIcons
            name="dice-multiple"
            size={28}
            color="rgba(123, 94, 167, 0.4)"
          />
        </View>
        <View style={[styles.floatingElement, styles.elementLeft]}>
          <MaterialCommunityIcons
            name="cash"
            size={22}
            color="rgba(54, 241, 205, 0.4)"
          />
        </View>
        <View style={[styles.floatingElement, styles.elementRight]}>
          <MaterialCommunityIcons
            name="trophy-outline"
            size={26}
            color="rgba(255, 209, 102, 0.4)"
          />
        </View>
        <View style={[styles.floatingElement, styles.elementBottom1]}>
          <MaterialCommunityIcons
            name="account-group-outline"
            size={26}
            color="rgba(123, 94, 167, 0.4)"
          />
        </View>
        <View style={[styles.floatingElement, styles.elementBottom2]}>
          <MaterialCommunityIcons
            name="party-popper"
            size={24}
            color="rgba(54, 241, 205, 0.4)"
          />
        </View>

        {/* Subtle dots pattern */}
        <View style={styles.dotsPattern}>
          {Array.from({ length: 40 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.1 + Math.random() * 0.3,
                  width: 2 + Math.random() * 3,
                  height: 2 + Math.random() * 3,
                },
              ]}
            />
          ))}
        </View>

        {/* Highlight glow at top */}
        <LinearGradient
          colors={["rgba(54, 241, 205, 0.15)", "rgba(54, 241, 205, 0)"]}
          style={styles.highlightGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            {/* Logo and App Name */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../../../assets/images/BlueClearLogo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appName}>Greed</Text>
              <Text style={styles.tagline}>Play together. Win together.</Text>
            </View>

            {/* Social Login Options */}
            <View style={styles.socialLoginContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleLogin}
              >
                <MaterialCommunityIcons
                  name="google"
                  size={22}
                  color={theme.text}
                />
                <Text style={styles.socialButtonText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleAppleLogin}
              >
                <MaterialCommunityIcons
                  name="apple"
                  size={22}
                  color={theme.text}
                />
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Terms and Privacy */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F13",
  },
  content: {
    flex: 1,
    position: "relative",
    zIndex: 2,
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  patternElements: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    overflow: "hidden",
  },
  floatingElement: {
    position: "absolute",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  elementTop1: {
    top: "10%",
    left: "20%",
  },
  elementTop2: {
    top: "15%",
    right: "25%",
  },
  elementLeft: {
    top: "45%",
    left: "10%",
  },
  elementRight: {
    top: "35%",
    right: "15%",
  },
  elementBottom1: {
    bottom: "20%",
    left: "25%",
  },
  elementBottom2: {
    bottom: "18%",
    right: "20%",
  },
  dotsPattern: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  dot: {
    position: "absolute",
    backgroundColor: "#36F1CD",
    borderRadius: 10,
  },
  highlightGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 25,
  },
  logo: {
    width: 200,
    height: 200,
  },
  appName: {
    color: theme.text,
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 10,
    textShadowColor: "rgba(54, 241, 205, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  tagline: {
    color: theme.text,
    fontSize: 18,
    letterSpacing: 1,
    marginTop: 10,
    fontWeight: "500",
    opacity: 0.9,
  },
  socialLoginContainer: {
    paddingHorizontal: 24,
    marginTop: 30,
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 30, 40, 0.6)",
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(54, 241, 205, 0.3)",
  },
  socialButtonText: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    letterSpacing: 0.5,
  },
  termsContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  termsText: {
    color: theme.textSecondary,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  termsLink: {
    color: theme.accent,
    fontWeight: "500",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: theme.textSecondary,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  signupButton: {
    color: theme.accent,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginLeft: 5,
  },
});
