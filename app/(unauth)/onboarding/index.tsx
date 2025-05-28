import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { completeOnboarding, getUserId } from "../../utils/auth";

const theme = {
  dark: "#1F1A20",
  surface: "#2A2329",
  accent: "#FF5D73",
  accentLight: "#FF5D7333",
  accentBright: "#FF7A8C",
  text: "#FFFFFF",
  textSecondary: "#C5BBC0",
  cardBackground: "#2E272B",
  success: "#7ECFB3",
  warning: "#FFC15E",
  error: "#FF5D73",
  info: "#86BBD8",
  purple: "#9D8CA1",
};

export default function OnboardingScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      title: "Welcome to Greed!",
      description:
        "The ultimate gaming platform where you can play, compete, and win with friends.",
      icon: "gamepad-variant",
    },
    {
      title: "Challenge Friends",
      description:
        "Create lobbies, invite friends, and compete in exciting games together.",
      icon: "account-group",
    },
    {
      title: "Win & Earn",
      description:
        "Climb the leaderboards, unlock achievements, and earn rewards for your skills.",
      icon: "trophy",
    },
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleSkip = () => {
    handleCompleteOnboarding();
  };

  const handleCompleteOnboarding = async () => {
    try {
      setLoading(true);

      // Get the user ID from stored user data
      const userId = await getUserId();
      if (!userId) {
        throw new Error("User ID not found");
      }

      console.log("Completing onboarding for user ID:", userId);

      // Call the API to mark onboarding as complete
      const success = await completeOnboarding(userId);

      if (success) {
        console.log("Onboarding completed successfully");
        router.push("/(tabs)/home");
      } else {
        throw new Error("Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);

      // More detailed error handling
      let errorMessage = "Failed to complete onboarding. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("404")) {
          errorMessage =
            "Server endpoint not found. Please check your connection.";
        } else if (error.message.includes("500")) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.message.includes("User ID not found")) {
          errorMessage = "Please log in again.";
          // Navigate back to login
          router.push("/(unauth)/login");
          return;
        }
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={["#2D2326", theme.dark]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons
              name={currentStepData.icon as any}
              size={80}
              color={theme.accent}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentStepData.title}</Text>
          <Text style={styles.description}>{currentStepData.description}</Text>
        </View>

        {/* Progress indicators */}
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    index <= currentStep ? theme.accent : theme.surface,
                },
              ]}
            />
          ))}
        </View>

        {/* Next/Get Started button */}
        <TouchableOpacity
          style={[styles.nextButton, loading && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={loading}
        >
          <Text style={styles.nextButtonText}>
            {loading
              ? "Completing..."
              : currentStep === onboardingSteps.length - 1
              ? "Get Started"
              : "Next"}
          </Text>
          {!loading && (
            <MaterialCommunityIcons
              name={
                currentStep === onboardingSteps.length - 1
                  ? "check"
                  : "chevron-right"
              }
              size={20}
              color={theme.text}
              style={styles.nextButtonIcon}
            />
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    color: theme.textSecondary,
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  iconContainer: {
    marginBottom: 60,
  },
  iconBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: theme.accentLight,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    color: theme.text,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: theme.textSecondary,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 60,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accent,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "100%",
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: theme.text,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  nextButtonIcon: {
    marginLeft: 8,
  },
});
