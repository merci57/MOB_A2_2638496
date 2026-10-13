// ============================================================
// HOME SCREEN
// Shows the required "My name is..." sentence, the profile
// image, the headline, the biography and the verification code.
// ============================================================

import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { usePortfolio } from "../context/PortfolioContext";
import { Card } from "../components/Card";

export const HomeScreen = () => {
  const { profile, imageUri, isLoading } = usePortfolio();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* ⬇️ REQUIRED SENTENCE - DO NOT CHANGE */}
      <Text style={styles.firstSentence}>My name is {profile.fullName}.</Text>

      {/* Profile image or placeholder */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={styles.avatarInitial}>
            {profile.fullName.charAt(0)}
          </Text>
        </View>
      )}

      {/* Professional headline */}
      <Text style={styles.headline}>{profile.headline}</Text>

      {/* Biography */}
      <Card title="About Me">
        <Text style={styles.biography}>{profile.biography}</Text>
      </Card>

      {/* Verification code */}
      <Card title="Verification Code">
        <Text style={styles.verificationCode}>
          {profile.verificationCode}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  firstSentence: {
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    textAlign: "center",
    color: "#222",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginVertical: 16,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  avatarPlaceholder: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headline: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    paddingHorizontal: 24,
    marginBottom: 8,
    fontStyle: "italic",
  },
  biography: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
  verificationCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    letterSpacing: 2,
  },
});