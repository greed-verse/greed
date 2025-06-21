import UnityView from "@azesmway/react-native-unity";
import React, { useEffect, useRef, useState } from "react";
import { Text as RNText, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card } from "react-native-paper";

const theme = {
  dark: "#1F1A20",
  surface: "#2A2329",
  accent: "#FF5D73",
  text: "#FFFFFF",
  textSecondary: "#C5BBC0",
  cardBackground: "#2E272B",
};

interface UnityGameViewProps {
  gameName: string;
  onGameEnd?: (score: number) => void;
  onGameStart?: () => void;
}

export default function UnityGameView({
  gameName,
  onGameEnd,
  onGameStart,
}: UnityGameViewProps) {
  const [isGameReady, setIsGameReady] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const unityRef = useRef<UnityView>(null);

  useEffect(() => {
    // Unity is ready when component mounts
    const timer = setTimeout(() => {
      setIsGameReady(true);
      console.log("Unity game is ready");
    }, 2000); // Give Unity time to initialize

    return () => clearTimeout(timer);
  }, []);

  const startGame = () => {
    if (unityRef.current && isGameReady) {
      onGameStart?.();

      // Send start signal to Unity
      unityRef.current.postMessage(
        "GameManager", // GameObject name in Unity
        "StartGame", // Method name in Unity script
        JSON.stringify({ action: "start" })
      );
    }
  };

  const handleUnityMessage = (event: any) => {
    try {
      const message = event.nativeEvent.message;
      const data = JSON.parse(message);

      console.log("Received from Unity:", data);

      switch (data.type) {
        case "GAME_SCORE":
          setGameScore(data.score);
          break;
        case "GAME_END":
          onGameEnd?.(data.finalScore);
          break;
      }
    } catch (error) {
      console.error("Error parsing Unity message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.gameCard}>
        <Card.Content>
          <RNText style={styles.gameTitle}>{gameName}</RNText>

          {gameScore > 0 && (
            <RNText style={styles.scoreText}>Score: {gameScore}</RNText>
          )}
        </Card.Content>
      </Card>

      <View style={styles.gameContainer}>
        {!isGameReady && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.accent} />
            <RNText style={styles.loadingText}>Loading Unity Game...</RNText>
          </View>
        )}

        <UnityView
          ref={unityRef}
          style={styles.unityView}
          onUnityMessage={handleUnityMessage}
        />
      </View>

      <View style={styles.controlsContainer}>
        {isGameReady && (
          <Button
            mode="contained"
            onPress={startGame}
            style={styles.startButton}
            buttonColor={theme.accent}
            textColor={theme.text}
          >
            Start Game
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
  },
  gameCard: {
    margin: 16,
    backgroundColor: theme.cardBackground,
  },
  gameTitle: {
    color: theme.text,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  scoreText: {
    color: theme.text,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },
  gameContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: theme.surface,
  },
  unityView: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.surface,
    zIndex: 1,
  },
  loadingText: {
    color: theme.text,
    marginTop: 16,
    fontSize: 16,
  },
  controlsContainer: {
    padding: 16,
  },
  startButton: {
    borderRadius: 25,
    paddingVertical: 8,
  },
});
