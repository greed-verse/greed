import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDeposit } from "../utils/DepositContext";

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

const presetAmounts = [10, 20, 50, 100];

export default function DepositModal() {
  const { isDepositModalVisible, hideDepositModal } = useDeposit();
  const [amount, setAmount] = useState("20");
  const balance = 5280; // This should come from a global state in a real app

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

  return (
    <Modal
      visible={isDepositModalVisible}
      animationType="slide"
      transparent
      onRequestClose={hideDepositModal}
    >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeBtn} onPress={hideDepositModal}>
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

          <TouchableOpacity style={styles.payBtn}>
            <Ionicons name="logo-apple" size={22} color="#000" />
            <Text style={styles.payBtnText}>Pay with Apple Pay</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By submitting your transaction you agree to the Greed{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Terms of Use
            </Text>
          </Text>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    backgroundColor: "#23232A",
    borderRadius: 16,
  },
  keypadKeyText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
  },
  payBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 12,
    marginBottom: 18,
    width: "100%",
    justifyContent: "center",
  },
  payBtnText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },
  termsText: {
    color: "#A0A0B2",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 16,
  },
});
