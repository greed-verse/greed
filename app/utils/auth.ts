import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://8497-173-89-34-191.ngrok-free.app"; // Replace with your actual URL

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const getUserId = async (): Promise<number | null> => {
  try {
    const userData = await getUserData();
    return userData?.id || null;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};

export const completeOnboarding = async (userId: number): Promise<boolean> => {
  try {
    console.log(`Making request to: ${API_BASE_URL}/user/complete-onboarding`);
    console.log("Request body:", JSON.stringify({ userId }));

    const response = await fetch(`${API_BASE_URL}/user/complete-onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true", // Add this for ngrok
      },
      body: JSON.stringify({ userId }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response body:", errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("Success response:", data);
    return data.success === true;
  } catch (error) {
    console.error("Error completing onboarding:", error);
    throw error;
  }
};
