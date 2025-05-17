import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ProgressBar, Surface } from "react-native-paper";

// Define theme colors
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

// Mock data for achievements
type Achievement = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress?: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const achievements: Achievement[] = [
  {
    id: "1",
    title: "First Win",
    description: "Win your first game",
    completed: true,
    icon: "trophy",
  },
  {
    id: "2",
    title: "High Roller",
    description: "Bet over 1000 coins in a single game",
    completed: false,
    progress: 0.7,
    icon: "cash-multiple",
  },
  {
    id: "3",
    title: "Social Butterfly",
    description: "Play with 10 different players",
    completed: false,
    progress: 0.3,
    icon: "account-group",
  },
];

export default function HomeScreen() {
  const [balance, setBalance] = useState(5280);

  // Mock function to join a random lobby
  const quickPlay = () => {
    console.log("Quick play pressed");
  };

  // Mock function to create a new lobby
  const createLobby = () => {
    console.log("Create lobby pressed");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.dark} />

      {/* Header with wallet info */}
      <View style={styles.headerContainer}>
        <View style={styles.walletHeader}>
          <View>
            <Text style={styles.playerName}>Player One</Text>
          </View>
          <TouchableOpacity style={styles.walletCard}>
            <MaterialCommunityIcons
              name="wallet-outline"
              size={18}
              color={theme.text}
            />
            <Text style={styles.walletBalance}>{balance.toLocaleString()}</Text>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={16}
              color={theme.accent}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance card */}
        <Surface style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceValue}>
                ${balance.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity style={styles.topUpButton}>
              <Text style={styles.topUpText}>Top Up</Text>
            </TouchableOpacity>
          </View>
        </Surface>

        {/* Quick actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={quickPlay}>
            <View style={styles.actionButtonInner}>
              <MaterialCommunityIcons
                name="play-circle-outline"
                size={24}
                color={theme.accent}
              />
              <Text style={styles.actionButtonLabel}>Quick Play</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={createLobby}>
            <View style={styles.actionButtonInner}>
              <MaterialCommunityIcons
                name="plus-circle-outline"
                size={24}
                color={theme.accent}
              />
              <Text style={styles.actionButtonLabel}>Create Lobby</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Game stats widget */}
        <Surface style={styles.statsCard}>
          <Text style={styles.cardTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Wins</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Games</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>86%</Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
          </View>
        </Surface>

        {/* Recent Activity */}
        <Surface style={styles.recentActivityCard}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <View
              style={[styles.activityDot, { backgroundColor: theme.success }]}
            />
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>
                Won a match against GamerX
              </Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <Text style={[styles.activityValue, { color: theme.success }]}>
              +250
            </Text>
          </View>
          <View style={styles.activityItem}>
            <View
              style={[styles.activityDot, { backgroundColor: theme.info }]}
            />
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>Joined Elite Team lobby</Text>
              <Text style={styles.activityTime}>Yesterday</Text>
            </View>
            <Text style={styles.activityTime}>Free</Text>
          </View>
          <View style={styles.activityItem}>
            <View
              style={[styles.activityDot, { backgroundColor: theme.error }]}
            />
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>
                Lost a match against ProPlayer
              </Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
            <Text style={[styles.activityValue, { color: theme.error }]}>
              -100
            </Text>
          </View>
        </Surface>

        {/* Achievements */}
        <Surface style={styles.achievementsCard}>
          <View style={styles.achievementsHeader}>
            <Text style={styles.cardTitle}>Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <View
                style={[
                  styles.achievementIcon,
                  {
                    backgroundColor: achievement.completed
                      ? theme.accentLight
                      : theme.surface,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={achievement.icon}
                  size={16}
                  color={
                    achievement.completed ? theme.accent : theme.textSecondary
                  }
                />
              </View>
              <View style={styles.achievementDetails}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                {!achievement.completed && achievement.progress && (
                  <ProgressBar
                    progress={achievement.progress}
                    color={theme.accent}
                    style={styles.progressBar}
                  />
                )}
              </View>
              {achievement.completed && (
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={theme.accent}
                  style={styles.completedIcon}
                />
              )}
            </View>
          ))}
        </Surface>

        {/* Space at the bottom for tab navigation */}
        <View style={{ height: 90 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerName: {
    color: theme.text,
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  walletCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  walletBalance: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 8,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  balanceCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    color: theme.textSecondary,
    fontSize: 14,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  balanceValue: {
    color: theme.text,
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  topUpButton: {
    backgroundColor: theme.accentLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  topUpText: {
    color: theme.accent,
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    width: "48%",
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    height: 80,
    padding: 16,
    justifyContent: "center",
  },
  actionButtonInner: {
    alignItems: "center",
  },
  actionButtonLabel: {
    color: theme.text,
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  statsCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  cardTitle: {
    color: theme.text,
    fontSize: 18,
    marginBottom: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  statValue: {
    color: theme.text,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  statLabel: {
    color: theme.textSecondary,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  recentActivityCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    color: theme.text,
    fontSize: 15,
    marginBottom: 4,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  activityTime: {
    color: theme.textSecondary,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  activityValue: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  achievementsCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  achievementsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllText: {
    color: theme.accent,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  achievementIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  achievementDetails: {
    flex: 1,
  },
  achievementTitle: {
    color: theme.text,
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  achievementDescription: {
    color: theme.textSecondary,
    fontSize: 13,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  completedIcon: {
    marginLeft: 8,
  },
});
