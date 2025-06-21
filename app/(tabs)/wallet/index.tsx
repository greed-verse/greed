import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Surface } from "react-native-paper";

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

const presetAmounts = [10, 20, 50, 100];

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
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("20");

  const handleKeyPress = (key: string) => {
    if (key === "back") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else {
      setAmount((prev) => {
        if (prev === "0") return key;
        if (prev.length >= 5) return prev;
        return prev + key;
      });
    }
  };

  const handlePreset = (val: number) => setAmount(val.toString());

  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Balance Card */}
        <Surface style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
            <TouchableOpacity
              style={styles.addFundsBtn}
              onPress={() => setModalVisible(true)}
            >
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

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <SafeAreaView style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>

              <View style={styles.balanceTag}>
                <MaterialCommunityIcons
                  name="wallet-outline"
                  size={16}
                  color="#A0A0B2"
                />
                <Text style={styles.balanceTagText}>Balance: ${balance}</Text>
              </View>

              <Text style={styles.modalAmount}>${amount}</Text>

              <TouchableOpacity style={styles.applePayBtn}>
                <Ionicons name="logo-apple" size={22} color="#fff" />
                <Text style={styles.applePayBtnText}>Apple Pay</Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={18}
                  color="#fff"
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>

              <View style={styles.presetRow}>
                {presetAmounts.map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={[
                      styles.presetBtn,
                      amount === val.toString() && styles.presetBtnActive,
                    ]}
                    onPress={() => handlePreset(val)}
                  >
                    <Text
                      style={[
                        styles.presetBtnText,
                        amount === val.toString() && styles.presetBtnTextActive,
                      ]}
                    >
                      ${val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Keypad */}
              <View style={styles.keypad}>
                {[
                  ["1", "2", "3"],
                  ["4", "5", "6"],
                  ["7", "8", "9"],
                  ["", "0", "back"],
                ].map((row, i) => (
                  <View key={i} style={styles.keypadRow}>
                    {row.map((key) =>
                      key === "" ? (
                        <View key={key} style={styles.keypadKey} />
                      ) : (
                        <TouchableOpacity
                          key={key}
                          style={styles.keypadKey}
                          onPress={() =>
                            key === "back"
                              ? handleKeyPress("back")
                              : handleKeyPress(key)
                          }
                        >
                          {key === "back" ? (
                            <MaterialCommunityIcons
                              name="backspace-outline"
                              size={28}
                              color="#fff"
                            />
                          ) : (
                            <Text style={styles.keypadKeyText}>{key}</Text>
                          )}
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                ))}
              </View>

              {/* Pay Button */}
              <TouchableOpacity style={styles.payBtn}>
                <Ionicons name="logo-apple" size={22} color="#000" />
                <Text style={styles.payBtnText}>Pay with Apple Pay</Text>
              </TouchableOpacity>

              {/* Terms */}
              <Text style={styles.termsText}>
                By submitting your transaction you agree to the Greed{" "}
                <Text style={{ textDecorationLine: "underline" }}>
                  Terms of Use
                </Text>
              </Text>
            </SafeAreaView>
          </View>
        </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000A",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#18181C",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    minHeight: "80%",
  },
  closeBtn: {
    position: "absolute",
    top: 40,
    right: 18,
    zIndex: 10,
    backgroundColor: "#23232A",
    borderRadius: 20,
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  balanceTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23232A",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginTop: 36,
    marginBottom: 18,
    alignSelf: "center",
    opacity: 0.7,
  },
  balanceTagText: {
    color: "#A0A0B2",
    fontSize: 15,
    marginLeft: 6,
    fontWeight: "600",
  },
  modalAmount: {
    color: "#fff",
    fontSize: 64,
    fontWeight: "700",
    marginVertical: 12,
    letterSpacing: 1,
  },
  applePayBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23232A",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 18,
    marginTop: 4,
    alignSelf: "center",
  },
  applePayBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  presetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },
  presetBtn: {
    backgroundColor: "#23232A",
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  presetBtnActive: {
    backgroundColor: theme.accentLight,
  },
  presetBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  presetBtnTextActive: {
    color: theme.accent,
  },
  keypad: {
    width: "100%",
    marginTop: 18,
    marginBottom: 18,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  keypadKey: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginHorizontal: 6,
    borderRadius: 16,
  },
  keypadKeyText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "600",
  },
  payBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 16,
    width: "100%",
    justifyContent: "center",
  },
  payBtnText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
  termsText: {
    color: "#A0A0B2",
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 8,
    width: "100%",
  },
});
