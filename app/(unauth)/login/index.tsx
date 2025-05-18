import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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

  const handleGoogleLogin = () => {
    setLoading(true);
    // Mock login functionality
    setTimeout(() => {
      setLoading(false);
      router.push("/(tabs)/home");
    }, 1500);
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
      {/* Gradient Background */}
      <LinearGradient
        colors={["#131320", "#0F0F13"]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Decorative Elements */}
      <View style={styles.decorativeElements}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
        <LinearGradient
          colors={["rgba(54, 241, 205, 0.1)", "rgba(54, 241, 205, 0)"]}
          style={styles.highlightGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
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
              <Text style={styles.tagline}>Risk it all. Win big.</Text>
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
  decorativeElements: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    overflow: "hidden",
  },
  circle1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(54, 241, 205, 0.03)",
    top: -50,
    right: -100,
  },
  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(123, 94, 167, 0.04)",
    bottom: 100,
    left: -70,
  },
  circle3: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(54, 241, 205, 0.02)",
    bottom: -50,
    right: -50,
  },
  highlightGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 60,
  },
  logo: {
    width: 180,
    height: 180,
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
    marginTop: 40,
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 30, 40, 0.8)",
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
