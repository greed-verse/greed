import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import { BottomNavigation, Provider } from "react-native-paper";

import DepositModal from "../components/DepositModal";
import GlobalHeader from "../components/GlobalHeader";
import { DepositProvider } from "../utils/DepositContext";
import HomeScreen from "./home";
import ExploreScreen from "./play";
import ProfileScreen from "./profile";
import WalletScreen from "./wallet";

const Tab = createBottomTabNavigator();

// Updated theme with red-based color scheme
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

export default function TabsLayout() {
  return (
    <DepositProvider>
      <Provider>
        <GlobalHeader />
        <DepositModal />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
              navigationState={state}
              safeAreaInsets={insets}
              inactiveColor={theme.textSecondary} // Updated to use new secondary text color
              activeColor={theme.accent} // Updated to use new accent color
              style={{
                backgroundColor: theme.dark, // Updated background
                borderTopWidth: 1, // Added subtle top border
                borderTopColor: "rgba(255,255,255,0.06)", // for a cleaner separation
                elevation: 8, // Increased elevation for more depth
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
              theme={{
                colors: {
                  secondaryContainer: theme.surface, // Updated for selected tab background
                  onSurfaceVariant: theme.accentLight, // Updated for icons
                },
              }}
              onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                  preventDefault();
                } else {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key,
                  });
                }
              }}
              renderIcon={({ route, focused, color }) =>
                descriptors[route.key].options.tabBarIcon?.({
                  focused,
                  color,
                  size: 24,
                }) || null
              }
              getLabelText={({ route }) => {
                const { options } = descriptors[route.key];
                const label =
                  typeof options.tabBarLabel === "string"
                    ? options.tabBarLabel
                    : typeof options.title === "string"
                    ? options.title
                    : route.name;

                return label;
              }}
            />
          )}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Play"
            component={ExploreScreen}
            options={{
              tabBarLabel: "Play",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="gamepad-variant"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Wallet"
            component={WalletScreen}
            options={{
              // Consider changing this to "Points" to further de-emphasize money
              tabBarLabel: "Wallet",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="wallet-outline"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </Provider>
    </DepositProvider>
  );
}
