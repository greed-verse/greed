import React from "react";
import { StyleSheet, View } from "react-native";

const theme = {
  dark: "#1F1A20",
};

export default function PlayScreen() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
    paddingTop: 80,
  },
});
