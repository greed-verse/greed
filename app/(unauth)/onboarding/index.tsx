import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

type UserInfo = {
  firstName: string;
  lastName: string;
  displayName: string;
  age: string;
  location: string;
  profileImage: string | null;
  favoriteGames: string[];
  skillLevel: "beginner" | "intermediate" | "advanced" | "pro";
  competitivePreference: "casual" | "competitive" | "mixed";
};

const gameOptions = [
  { id: "poker", name: "Poker", icon: "cards" },
  { id: "blackjack", name: "Blackjack", icon: "cards-spade" },
  { id: "dice", name: "Dice Games", icon: "dice-multiple" },
  { id: "roulette", name: "Roulette", icon: "circle-outline" },
  { id: "slots", name: "Slots", icon: "slot-machine" },
  { id: "trivia", name: "Trivia", icon: "head-question" },
];

const skillLevels = [
  { id: "beginner", name: "Beginner", description: "I'm new to gaming" },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "I play occasionally",
  },
  { id: "advanced", name: "Advanced", description: "I'm pretty skilled" },
  { id: "pro", name: "Pro", description: "I'm highly competitive" },
];

const competitiveOptions = [
  {
    id: "casual",
    name: "Casual Fun",
    description: "Just for entertainment",
    icon: "emoticon-happy",
  },
  {
    id: "competitive",
    name: "Competitive",
    description: "I play to win",
    icon: "trophy",
  },
  {
    id: "mixed",
    name: "Mixed",
    description: "Depends on my mood",
    icon: "shuffle-variant",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    displayName: "",
    age: "",
    location: "",
    profileImage: null,
    favoriteGames: [],
    skillLevel: "beginner",
    competitivePreference: "casual",
  });

  const onboardingSteps = [
    {
      type: "intro",
      title: "Welcome to Greed!",
      description:
        "The ultimate social gaming platform where you compete with friends, climb leaderboards, and win big!",
      icon: "gamepad-variant",
    },
    {
      type: "personal",
      title: "Tell us about yourself",
      description: "Help us personalize your gaming experience",
      icon: "account-edit",
    },
    {
      type: "profile",
      title: "Set up your profile",
      description: "Add a photo and choose your display name",
      icon: "camera-account",
    },
    {
      type: "games",
      title: "What games do you love?",
      description: "Select your favorite types of games",
      icon: "cards",
    },
    {
      type: "skill",
      title: "What's your skill level?",
      description: "This helps us match you with the right opponents",
      icon: "chart-line",
    },
    {
      type: "style",
      title: "How do you like to play?",
      description: "Are you here for fun or serious competition?",
      icon: "target",
    },
    {
      type: "features",
      title: "Here's what you can do",
      description: "Discover all the amazing features waiting for you",
      icon: "star-circle",
    },
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleCompleteOnboarding();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please grant camera roll permissions to add a profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUserInfo((prev) => ({ ...prev, profileImage: result.assets[0].uri }));
    }
  };

  const toggleGame = (gameId: string) => {
    setUserInfo((prev) => ({
      ...prev,
      favoriteGames: prev.favoriteGames.includes(gameId)
        ? prev.favoriteGames.filter((id) => id !== gameId)
        : [...prev.favoriteGames, gameId],
    }));
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
      console.log("User info collected:", userInfo);

      // TODO: Save user profile information to backend here
      // For now, we'll just complete the onboarding flow

      const success = await completeOnboarding(userId);

      if (success) {
        console.log("Onboarding completed successfully");
        router.push("/(tabs)/home");
      } else {
        throw new Error("Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);

      let errorMessage = "Failed to complete onboarding. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("404")) {
          errorMessage =
            "Server endpoint not found. Please check your connection.";
        } else if (error.message.includes("500")) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.message.includes("User ID not found")) {
          errorMessage = "Please log in again.";
          router.push("/(unauth)/login");
          return;
        }
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    const step = onboardingSteps[currentStep];
    switch (step.type) {
      case "personal":
        return (
          userInfo.firstName.trim() &&
          userInfo.age.trim() &&
          userInfo.location.trim()
        );
      case "profile":
        return userInfo.displayName.trim();
      case "games":
        return userInfo.favoriteGames.length > 0;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    const step = onboardingSteps[currentStep];

    switch (step.type) {
      case "intro":
        return (
          <View style={styles.introContent}>
            <Text style={styles.featureText}>
              🎮 Challenge friends in real-time games
            </Text>
            <Text style={styles.featureText}>
              🏆 Climb leaderboards and earn achievements
            </Text>
            <Text style={styles.featureText}>
              💰 Win rewards and build your reputation
            </Text>
            <Text style={styles.featureText}>
              👥 Join communities and tournaments
            </Text>
          </View>
        );

      case "personal":
        return (
          <View style={styles.formContent}>
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={userInfo.firstName}
                  onChangeText={(text) =>
                    setUserInfo((prev) => ({ ...prev, firstName: text }))
                  }
                  placeholder="John"
                  placeholderTextColor={theme.textSecondary}
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={userInfo.lastName}
                  onChangeText={(text) =>
                    setUserInfo((prev) => ({ ...prev, lastName: text }))
                  }
                  placeholder="Doe"
                  placeholderTextColor={theme.textSecondary}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>Age</Text>
                <TextInput
                  style={styles.textInput}
                  value={userInfo.age}
                  onChangeText={(text) =>
                    setUserInfo((prev) => ({ ...prev, age: text }))
                  }
                  placeholder="25"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput
                  style={styles.textInput}
                  value={userInfo.location}
                  onChangeText={(text) =>
                    setUserInfo((prev) => ({ ...prev, location: text }))
                  }
                  placeholder="New York, NY"
                  placeholderTextColor={theme.textSecondary}
                />
              </View>
            </View>
          </View>
        );

      case "profile":
        return (
          <View style={styles.profileContent}>
            <TouchableOpacity
              style={styles.profileImageContainer}
              onPress={pickImage}
            >
              {userInfo.profileImage ? (
                <Image
                  source={{ uri: userInfo.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <MaterialCommunityIcons
                    name="camera-plus"
                    size={40}
                    color={theme.accent}
                  />
                  <Text style={styles.addPhotoText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Display Name</Text>
            <TextInput
              style={styles.textInput}
              value={userInfo.displayName}
              onChangeText={(text) =>
                setUserInfo((prev) => ({ ...prev, displayName: text }))
              }
              placeholder="GamerPro2024"
              placeholderTextColor={theme.textSecondary}
            />
            <Text style={styles.hintText}>
              This is how other players will see you
            </Text>
          </View>
        );

      case "games":
        return (
          <View style={styles.gamesContent}>
            <View style={styles.gameGrid}>
              {gameOptions.map((game) => (
                <TouchableOpacity
                  key={game.id}
                  style={[
                    styles.gameOption,
                    userInfo.favoriteGames.includes(game.id) &&
                      styles.gameOptionSelected,
                  ]}
                  onPress={() => toggleGame(game.id)}
                >
                  <MaterialCommunityIcons
                    name={game.icon as any}
                    size={32}
                    color={
                      userInfo.favoriteGames.includes(game.id)
                        ? theme.accent
                        : theme.textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.gameOptionText,
                      userInfo.favoriteGames.includes(game.id) &&
                        styles.gameOptionTextSelected,
                    ]}
                  >
                    {game.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.hintText}>Select at least one game type</Text>
          </View>
        );

      case "skill":
        return (
          <View style={styles.skillContent}>
            {skillLevels.map((skill) => (
              <TouchableOpacity
                key={skill.id}
                style={[
                  styles.skillOption,
                  userInfo.skillLevel === skill.id &&
                    styles.skillOptionSelected,
                ]}
                onPress={() =>
                  setUserInfo((prev) => ({
                    ...prev,
                    skillLevel: skill.id as any,
                  }))
                }
              >
                <View style={styles.skillInfo}>
                  <Text
                    style={[
                      styles.skillName,
                      userInfo.skillLevel === skill.id &&
                        styles.skillNameSelected,
                    ]}
                  >
                    {skill.name}
                  </Text>
                  <Text style={styles.skillDescription}>
                    {skill.description}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name={
                    userInfo.skillLevel === skill.id
                      ? "check-circle"
                      : "circle-outline"
                  }
                  size={24}
                  color={
                    userInfo.skillLevel === skill.id
                      ? theme.accent
                      : theme.textSecondary
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        );

      case "style":
        return (
          <View style={styles.styleContent}>
            {competitiveOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.styleOption,
                  userInfo.competitivePreference === option.id &&
                    styles.styleOptionSelected,
                ]}
                onPress={() =>
                  setUserInfo((prev) => ({
                    ...prev,
                    competitivePreference: option.id as any,
                  }))
                }
              >
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={32}
                  color={
                    userInfo.competitivePreference === option.id
                      ? theme.accent
                      : theme.textSecondary
                  }
                />
                <View style={styles.styleInfo}>
                  <Text
                    style={[
                      styles.styleName,
                      userInfo.competitivePreference === option.id &&
                        styles.styleNameSelected,
                    ]}
                  >
                    {option.name}
                  </Text>
                  <Text style={styles.styleDescription}>
                    {option.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case "features":
        return (
          <View style={styles.featuresContent}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color={theme.accent}
              />
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>Social Gaming</Text>
                <Text style={styles.featureDesc}>
                  Create lobbies, invite friends, and play together
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="trophy-variant"
                size={24}
                color={theme.success}
              />
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>Achievements & Rewards</Text>
                <Text style={styles.featureDesc}>
                  Unlock badges, climb leaderboards, earn prizes
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="wallet"
                size={24}
                color={theme.warning}
              />
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>Secure Wallet</Text>
                <Text style={styles.featureDesc}>
                  Safe transactions with multiple payment options
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="chart-line"
                size={24}
                color={theme.info}
              />
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>Stats & Analytics</Text>
                <Text style={styles.featureDesc}>
                  Track your progress and improve your skills
                </Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2D2326", theme.dark]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Skip button - only show on non-essential steps */}
      {!["personal", "profile", "games"].includes(currentStepData.type) && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <MaterialCommunityIcons
                name={currentStepData.icon as any}
                size={60}
                color={theme.accent}
              />
            </View>
          </View>

          {/* Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentStepData.title}</Text>
            <Text style={styles.description}>
              {currentStepData.description}
            </Text>
          </View>

          {/* Step-specific content */}
          {renderStepContent()}

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

          {/* Navigation buttons */}
          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={20}
                  color={theme.textSecondary}
                />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.nextButton,
                (!canProceed() || loading) && styles.nextButtonDisabled,
                currentStep === 0 && styles.nextButtonFull,
              ]}
              onPress={handleNext}
              disabled={!canProceed() || loading}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
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
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
    minHeight: "100%",
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.accentLight,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
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
    marginBottom: 40,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: theme.textSecondary,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.accent,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flex: 1,
    marginLeft: 16,
  },
  nextButtonFull: {
    marginLeft: 0,
  },
  nextButtonDisabled: {
    opacity: 0.5,
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
  // Intro content
  introContent: {
    width: "100%",
    marginBottom: 20,
  },
  featureText: {
    color: theme.text,
    fontSize: 16,
    marginBottom: 16,
    paddingLeft: 8,
    lineHeight: 24,
  },
  // Form content
  formContent: {
    width: "100%",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputHalf: {
    width: "48%",
  },
  inputLabel: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: theme.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  hintText: {
    color: theme.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
  },
  // Profile content
  profileContent: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.accent,
    borderStyle: "dashed",
  },
  addPhotoText: {
    color: theme.accent,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  // Games content
  gamesContent: {
    width: "100%",
    marginBottom: 20,
  },
  gameGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gameOption: {
    width: "48%",
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  gameOptionSelected: {
    borderColor: theme.accent,
    backgroundColor: theme.accentLight,
  },
  gameOptionText: {
    color: theme.textSecondary,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  gameOptionTextSelected: {
    color: theme.accent,
  },
  // Skill content
  skillContent: {
    width: "100%",
    marginBottom: 20,
  },
  skillOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  skillOptionSelected: {
    borderColor: theme.accent,
    backgroundColor: theme.accentLight,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    color: theme.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  skillNameSelected: {
    color: theme.accent,
  },
  skillDescription: {
    color: theme.textSecondary,
    fontSize: 14,
  },
  // Style content
  styleContent: {
    width: "100%",
    marginBottom: 20,
  },
  styleOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  styleOptionSelected: {
    borderColor: theme.accent,
    backgroundColor: theme.accentLight,
  },
  styleInfo: {
    flex: 1,
    marginLeft: 16,
  },
  styleName: {
    color: theme.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  styleNameSelected: {
    color: theme.accent,
  },
  styleDescription: {
    color: theme.textSecondary,
    fontSize: 14,
  },
  // Features content
  featuresContent: {
    width: "100%",
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  featureInfo: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  featureDesc: {
    color: theme.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
