import React from "react";
import { StyleSheet, View } from "react-native";

import UnityGameView from "../../components/UnityGameView";

const theme = {
  dark: "#1F1A20",
};

export default function PlayScreen() {
  const onGameEnd = (score: number) => {
    console.log(`Game ended with score: ${score}`);
  };

  const onGameStart = () => {
    console.log("Game started!");
  };

  return (
    <View style={styles.container}>
      <UnityGameView
        gameName="My Unity Game"
        onGameEnd={onGameEnd}
        onGameStart={onGameStart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
    paddingTop: 80,
  },
});
