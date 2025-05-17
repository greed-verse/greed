import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Surface } from "react-native-paper";

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
  purple: "#7B5EA7",
};

const recentTransactions = [
  {
    id: "1",
    type: "Deposit",
    amount: 1000,
    status: "Completed",
    time: "Today, 2:30 PM",
    icon: "arrow-down-bold-circle-outline",
    color: theme.success,
  },
  {
    id: "2",
    type: "Withdrawal",
    amount: 500,
    status: "Pending",
    time: "Yesterday, 5:10 PM",
    icon: "arrow-up-bold-circle-outline",
    color: theme.warning,
  },
  {
    id: "3",
    type: "Winnings",
    amount: 250,
    status: "Completed",
    time: "2 days ago",
    icon: "trophy-outline",
    color: theme.accent,
  },
  {
    id: "4",
    type: "Bet Placed",
    amount: -100,
    status: "Completed",
    time: "2 days ago",
    icon: "dice-multiple-outline",
    color: theme.purple,
  },
];

export default function WalletScreen() {
  const balance = 5280;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Balance Card */}
        <Surface style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <TouchableOpacity style={styles.addFundsBtn}>
              <MaterialCommunityIcons
                name="plus-circle-outline"
                size={20}
                color={theme.accent}
              />
              <Text style={styles.addFundsText}>Add Funds</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceValue}>${balance.toLocaleString()}</Text>
        </Surface>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons
              name="arrow-down-bold-circle-outline"
              size={28}
              color={theme.success}
            />
            <Text style={styles.actionLabel}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons
              name="arrow-up-bold-circle-outline"
              size={28}
              color={theme.warning}
            />
            <Text style={styles.actionLabel}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons
              name="history"
              size={28}
              color={theme.info}
            />
            <Text style={styles.actionLabel}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <Surface style={styles.transactionsCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentTransactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View
                style={[styles.txIcon, { backgroundColor: tx.color + "22" }]}
              >
                <MaterialCommunityIcons size={22} color={tx.color} />
              </View>
              <View style={styles.txDetails}>
                <Text style={styles.txType}>{tx.type}</Text>
                <Text style={styles.txTime}>{tx.time}</Text>
              </View>
              <Text
                style={[
                  styles.txAmount,
                  { color: tx.amount > 0 ? theme.success : theme.error },
                ]}
              >
                {tx.amount > 0 ? "+" : ""}
                {tx.amount < 0 ? "-" : ""}${Math.abs(tx.amount)}
              </Text>
            </View>
          ))}
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
    paddingTop: 50,
  },
  balanceCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 18,
    padding: 24,
    marginBottom: 28,
    elevation: 2,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceLabel: {
    color: theme.textSecondary,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  addFundsBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.accentLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addFundsText: {
    color: theme.accent,
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
  },
  balanceValue: {
    color: theme.text,
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginTop: 4,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  actionBtn: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.surface,
    paddingVertical: 18,
    marginHorizontal: 6,
    borderRadius: 16,
    elevation: 1,
  },
  actionLabel: {
    color: theme.text,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    letterSpacing: 0.5,
  },
  transactionsCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
  },
  sectionTitle: {
    color: theme.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  txIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  txDetails: {
    flex: 1,
  },
  txType: {
    color: theme.text,
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
  },
  txTime: {
    color: theme.textSecondary,
    fontSize: 13,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    minWidth: 70,
    textAlign: "right",
  },
});
