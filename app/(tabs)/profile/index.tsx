import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ProgressBar, Surface } from "react-native-paper";

// Using the same theme as the rest of the app
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

// Mock user data
const userData = {
  name: "Player One",
  username: "player1",
  avatar: null, // Will use initials instead
  level: 8,
  xpCurrent: 750,
  xpRequired: 1000,
  joinDate: "May 2025",
  gamesPlayed: 60,
  wins: 42,
  winRate: "70%",
  totalWinnings: 8500,
};

// Settings options
const settingsOptions: {
  id: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  type: "toggle" | "navigate";
  value?: boolean;
}[] = [
  {
    id: "notifications",
    icon: "bell-outline",
    title: "Notifications",
    type: "toggle",
    value: true,
  },
  {
    id: "sound",
    icon: "volume-high",
    title: "Sound Effects",
    type: "toggle",
    value: true,
  },
  {
    id: "darkMode",
    icon: "theme-light-dark",
    title: "Dark Mode",
    type: "toggle",
    value: true,
  },
  {
    id: "privacy",
    icon: "shield-account-outline",
    title: "Privacy Settings",
    type: "navigate",
  },
  {
    id: "payment",
    icon: "credit-card-outline",
    title: "Payment Methods",
    type: "navigate",
  },
  {
    id: "support",
    icon: "help-circle-outline",
    title: "Help & Support",
    type: "navigate",
  },
  {
    id: "about",
    icon: "information-outline",
    title: "About Greed",
    type: "navigate",
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState(settingsOptions);

  // Get user initials for avatar placeholder
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Toggle setting value
  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
  };

  // Handle navigation settings
  const handleSettingPress = (setting: any) => {
    if (setting.type === "navigate") {
      // Mock navigation
      Alert.alert(`Navigating to ${setting.title}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.push("/(unauth)/login"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Modern Gradient Background similar to login screen */}
      <LinearGradient
        colors={["#1A1A30", "#0F0F13"]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Highlight glow at top */}
      <LinearGradient
        colors={["rgba(54, 241, 205, 0.10)", "rgba(54, 241, 205, 0)"]}
        style={styles.highlightGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          {userData.avatar ? (
            <Image source={userData.avatar} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>
                {getInitials(userData.name)}
              </Text>
            </View>
          )}
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userHandle}>@{userData.username}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.gamesPlayed}</Text>
              <Text style={styles.statLabel}>Games</Text>
            </View>
            <View style={styles.statItemDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.wins}</Text>
              <Text style={styles.statLabel}>Wins</Text>
            </View>
            <View style={styles.statItemDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.winRate}</Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Level and XP */}
        <Surface style={styles.levelCard}>
          <View style={styles.levelHeaderRow}>
            <View style={styles.levelBadge}>
              <MaterialCommunityIcons
                name="star"
                size={16}
                color={theme.accent}
              />
              <Text style={styles.levelText}>Level {userData.level}</Text>
            </View>
            <Text style={styles.xpText}>
              {userData.xpCurrent}/{userData.xpRequired} XP
            </Text>
          </View>
          <ProgressBar
            progress={userData.xpCurrent / userData.xpRequired}
            color={theme.accent}
            style={styles.progressBar}
          />
          <Text style={styles.levelHint}>
            Win 5 more games to reach Level {userData.level + 1}
          </Text>
        </Surface>

        {/* Winnings Summary */}
        <Surface style={styles.winningsCard}>
          <Text style={styles.cardTitle}>Lifetime Winnings</Text>
          <Text style={styles.winningsAmount}>
            ${userData.totalWinnings.toLocaleString()}
          </Text>
          <TouchableOpacity style={styles.historyButton}>
            <Text style={styles.historyButtonText}>View History</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={theme.accent}
            />
          </TouchableOpacity>
        </Surface>

        {/* Settings */}
        <Surface style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Settings</Text>
          {settings.map((setting, index) => (
            <React.Fragment key={setting.id}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <MaterialCommunityIcons
                    name={setting.icon}
                    size={22}
                    color={theme.textSecondary}
                  />
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                </View>
                {setting.type === "toggle" ? (
                  <Switch
                    value={setting.value}
                    onValueChange={() => toggleSetting(setting.id)}
                    trackColor={{ false: "#3A3A45", true: theme.accentLight }}
                    thumbColor={setting.value ? theme.accent : "#f4f3f4"}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => handleSettingPress(setting)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={22}
                      color={theme.textSecondary}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {index < settings.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </Surface>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color={theme.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Greed v1.0.3</Text>

        {/* Bottom padding */}
        <View style={{ height: 30 }} />
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
  highlightGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.accentLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarInitials: {
    color: theme.accent,
    fontSize: 36,
    fontWeight: "700",
  },
  userName: {
    color: theme.text,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  userHandle: {
    color: theme.textSecondary,
    fontSize: 16,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 40, 0.6)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statItemDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  statValue: {
    color: theme.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  statLabel: {
    color: theme.textSecondary,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: theme.accent,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 6,
  },
  editProfileText: {
    color: theme.accent,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  levelCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  levelHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.accentLight,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  levelText: {
    color: theme.accent,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  xpText: {
    color: theme.textSecondary,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 10,
  },
  levelHint: {
    color: theme.textSecondary,
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    letterSpacing: 0.3,
  },
  winningsCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: theme.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  winningsAmount: {
    color: theme.success,
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  historyButtonText: {
    color: theme.accent,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  settingsCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingTitle: {
    color: theme.text,
    fontSize: 16,
    marginLeft: 16,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(239, 71, 111, 0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  logoutText: {
    color: theme.error,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  versionText: {
    color: theme.textSecondary,
    fontSize: 14,
    textAlign: "center",
    opacity: 0.7,
    letterSpacing: 0.3,
  },
});
