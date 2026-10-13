// ============================================================
// APP.TSX - Main entry point of UMMPortifolio
// Wraps the app in PortfolioProvider (for data persistence)
// and renders the AppNavigator (for navigation).
// ============================================================

import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PortfolioProvider } from "./src/context/PortfolioContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <PortfolioProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </PortfolioProvider>
    </SafeAreaProvider>
  );
}