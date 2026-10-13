// ============================================================
// PORTFOLIO CONTEXT
// This file manages the profile data and saves it locally.
// It uses AsyncStorage to remember the data after closing the app.
// ============================================================

import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STUDENT_INFO } from "../utils/portfolioData";

// Keys used to store data in AsyncStorage
const PROFILE_KEY = "@hbm_portfolio_profile";
const IMAGE_KEY = "@hbm_portfolio_image";

// Create the context
const PortfolioContext = createContext<any>(null);

// Provider component that wraps the entire app
export const PortfolioProvider = ({ children }: any) => {
  // Profile state (starts with default data from portfolioData.ts)
  const [profile, setProfile] = useState(STUDENT_INFO);

  // Profile image state (URI of the image)
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // ---------------------------------------------
  // LOAD DATA when the app starts
  // ---------------------------------------------
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);
        const savedImage = await AsyncStorage.getItem(IMAGE_KEY);

        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
        if (savedImage) {
          setImageUri(savedImage);
        }
      } catch (error) {
        console.log("Error loading saved data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, []);

  // ---------------------------------------------
  // SAVE PROFILE
  // ---------------------------------------------
  const saveProfile = async (newProfile: any) => {
    try {
      setProfile(newProfile);
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    } catch (error) {
      console.log("Error saving profile:", error);
    }
  };

  // ---------------------------------------------
  // SAVE IMAGE
  // ---------------------------------------------
  const saveImage = async (uri: string | null) => {
    try {
      setImageUri(uri);
      if (uri) {
        await AsyncStorage.setItem(IMAGE_KEY, uri);
      } else {
        await AsyncStorage.removeItem(IMAGE_KEY);
      }
    } catch (error) {
      console.log("Error saving image:", error);
    }
  };

  // ---------------------------------------------
  // RESET PROFILE (delete saved data)
  // ---------------------------------------------
  const resetProfile = async () => {
    try {
      await AsyncStorage.removeItem(PROFILE_KEY);
      await AsyncStorage.removeItem(IMAGE_KEY);
      setProfile(STUDENT_INFO);
      setImageUri(null);
    } catch (error) {
      console.log("Error resetting profile:", error);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        saveProfile,
        imageUri,
        saveImage,
        resetProfile,
        isLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the context easily
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  }
  return context;
};