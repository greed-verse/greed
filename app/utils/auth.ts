import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:8080";

export interface User {
  id: number;
  email: string;
  name: string;
  first_login: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

export const getUserData = async (): Promise<User | null> => {
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
    const token = await getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/user/complete-onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error completing onboarding:", error);
    throw error;
  }
};

export const getUserStats = async (userId: number): Promise<any> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/user/${userId}/stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting user stats:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(["token", "user"]);
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
