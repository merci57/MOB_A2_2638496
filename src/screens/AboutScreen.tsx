// ============================================================
// ABOUT SCREEN
// Shows app info, student identity, verification code,
// version, and data-use statement.
// ============================================================

import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { usePortfolio } from "../context/PortfolioContext";
import { Card } from "../components/Card";

export const AboutScreen = () => {
  const { profile } = usePortfolio();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* App header */}
      <View style={styles.header}>
        <Text style={styles.appName}>{profile.appName}</Text>
        <Text style={styles.version}>Version {profile.version}</Text>
      </View>

      {/* Student identity */}
      <Card title="Student Information">
        <View style={styles.row}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{profile.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Registration Number</Text>
          <Text style={styles.value}>{profile.registrationNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Verification Code</Text>
          <Text style={styles.valueBlue}>{profile.verificationCode}</Text>
        </View>
      </Card>

      {/* Data use statement */}
      <Card title="Data Use Statement">
        <Text style={styles.bodyText}>
          This application stores all your personal portfolio data (name,
          biography, photo, skills, projects) locally on your device using
          AsyncStorage. No data is sent to any server or shared with any
          third party. You can reset your data at any time by clearing the
          app data from your device settings.
        </Text>
      </Card>

      {/* Offline behavior */}
      <Card title="Offline Information">
        <Text style={styles.bodyText}>
          ✅ This app works fully offline. All features (profile, skills,
          projects, editor) are available without an internet connection.
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 8,
  },
  appName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007AFF",
  },
  version: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  row: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 13,
    color: "#888",
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
  },
  valueBlue: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#444",
  },
});