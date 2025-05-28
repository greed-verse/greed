import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";

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
  dark: "#1F1A20", // Slightly warmer dark background
  surface: "#2A2329", // Warmer surface color with slight red tint
  accent: "#FF5D73", // Warm coral/red as primary accent
  accentLight: "#FF5D7333", // Coral with opacity
  accentBright: "#FF7A8C", // Brighter coral for highlights
  text: "#FFFFFF", // Keep white text
  textSecondary: "#C5BBC0", // Warmer secondary text
  cardBackground: "#2E272B", // Card background with red undertone
  success: "#7ECFB3", // Teal-ish success color (less financial)
  warning: "#FFC15E", // Warm amber warning
  error: "#FF5D73", // Same as accent for consistency
  info: "#86BBD8", // Soft blue info
  purple: "#9D8CA1", // Muted purple for variety
};

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const loginUrl = `${BACKEND_URL}/auth/google/login`;

    const listener = Linking.addEventListener("url", async (event) => {
      console.log("Deep link received:", event.url);
      const url = event.url;
      const tokenParam = Linking.parse(url).queryParams?.token;

      if (tokenParam) {
        const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
        await AsyncStorage.setItem("jwt", token);
        listener.remove();
        router.push("/(tabs)/home");
      }
    });
    try {
      await Linking.openURL(loginUrl);
    } catch (error) {
      console.error("Failed to open Google auth URL:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      setLoading(true);

      const response = await fetch(
        "https://8497-173-89-34-191.ngrok-free.app/auth/apple/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token: credential.identityToken }),
        }
      );

      const data = await response.json();

      // Add debugging logs
      console.log("Full response data:", JSON.stringify(data, null, 2));
      console.log("Response status:", response.status);
      console.log("Data keys:", Object.keys(data));

      if (data.user) {
        console.log("User object:", JSON.stringify(data.user, null, 2));
        console.log("User keys:", Object.keys(data.user));
        console.log("first_login value:", data.user.first_login);
        console.log("first_login type:", typeof data.user.first_login);
      }

      // Store the token and user data
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      console.log("User data:", data.user);
      console.log("First login value:", data.user.first_login);

      setLoading(false);

      // Check if this is a first-time user
      if (data.user && data.user.first_login === true) {
        console.log("Navigating to onboarding");
        router.push("/(unauth)/onboarding");
      } else {
        console.log("Navigating to home");
        router.push("/(tabs)/home");
      }
    } catch (e) {
      console.log("Error:", e);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Updated Gradient Background with new colors */}
      <LinearGradient
        colors={["#2D2326", theme.dark]}
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
            color="rgba(255, 93, 115, 0.4)" // Updated color to match new theme
          />
        </View>
        <View style={[styles.floatingElement, styles.elementTop2]}>
          <MaterialCommunityIcons
            name="dice-multiple"
            size={28}
            color="rgba(157, 140, 161, 0.4)" // Updated to theme.purple with opacity
          />
        </View>
        <View style={[styles.floatingElement, styles.elementLeft]}>
          <MaterialCommunityIcons
            name="gamepad-variant" // Changed to a valid icon name for gaming
            size={22}
            color="rgba(255, 93, 115, 0.4)" // Updated color
          />
        </View>
        <View style={[styles.floatingElement, styles.elementRight]}>
          <MaterialCommunityIcons
            name="trophy-outline"
            size={26}
            color="rgba(255, 193, 94, 0.4)" // Updated to theme.warning with opacity
          />
        </View>
        <View style={[styles.floatingElement, styles.elementBottom1]}>
          <MaterialCommunityIcons
            name="account-group-outline"
            size={26}
            color="rgba(157, 140, 161, 0.4)" // Updated to theme.purple with opacity
          />
        </View>
        <View style={[styles.floatingElement, styles.elementBottom2]}>
          <MaterialCommunityIcons
            name="party-popper"
            size={24}
            color="rgba(255, 93, 115, 0.4)" // Updated color
          />
        </View>

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

        <LinearGradient
          colors={["rgba(255, 93, 115, 0.15)", "rgba(255, 93, 115, 0)"]}
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
                source={require("../../../assets/images/GreedRedLogo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appName}>Greed</Text>
              <Text style={styles.tagline}>Play together. Win together.</Text>
            </View>

            {/* Social Login Options - Updated with new theme colors */}
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

              <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                }
                buttonStyle={
                  AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                }
                cornerRadius={16}
                style={[{ height: 50 }]}
                onPress={handleAppleLogin}
              />
            </View>

            {/* Terms and Privacy - Updated text color */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Sign Up Section - Updated text color */}
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
    backgroundColor: theme.dark,
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
    backgroundColor: theme.accent, // Updated dot color
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
    textShadowColor: "rgba(255, 93, 115, 0.4)", // Updated text shadow color
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
    backgroundColor: "rgba(46, 39, 43, 0.6)", // Updated with cardBackground with opacity
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 93, 115, 0.3)", // Updated border color
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
    color: theme.textSecondary, // Updated to new secondary text color
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  termsLink: {
    color: theme.accent, // Updated to new accent color
    fontWeight: "500",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: theme.textSecondary, // Updated to new secondary text color
    fontSize: 16,
    letterSpacing: 0.5,
  },
  signupButton: {
    color: theme.accent, // Updated to new accent color
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginLeft: 5,
  },
});
