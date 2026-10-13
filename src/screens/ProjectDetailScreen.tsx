// ============================================================
// PROJECT DETAIL SCREEN
// Shows full details of a single project.
// Includes an optional GitHub link that REQUIRES internet.
// ============================================================

import React from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Card } from "../components/Card";

export const ProjectDetailScreen = ({ route }: any) => {
  // Get the project object passed from the ProjectsScreen
  const { project } = route.params;

  // ---------------------------------------------
  // OPEN GITHUB LINK (requires internet)
  // ---------------------------------------------
  const openGithubLink = async () => {
    if (!project.githubLink) return;

    try {
      const supported = await Linking.canOpenURL(project.githubLink);
      if (supported) {
        await Linking.openURL(project.githubLink);
      } else {
        Alert.alert("Error", "Cannot open this link on your device.");
      }
    } catch (error) {
      Alert.alert(
        "Connection Error",
        "This link requires an internet connection."
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Project title */}
      <Text style={styles.title}>{project.title}</Text>

      {/* Problem card */}
      <Card title="Problem">
        <Text style={styles.bodyText}>{project.problem}</Text>
      </Card>

      {/* Contribution card */}
      <Card title="My Contribution">
        <Text style={styles.bodyText}>{project.contribution}</Text>
      </Card>

      {/* Technology card */}
      <Card title="Technologies Used">
        <View style={styles.techContainer}>
          {project.technology.split(",").map((tech: string, index: number) => (
            <View key={index} style={styles.techBadge}>
              <Text style={styles.techText}>{tech.trim()}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* GitHub link card (OPTIONAL - requires internet) */}
      {project.githubLink ? (
        <Card title="Source Code">
          <Text style={styles.warningText}>
            ⚠️ Requires internet connection
          </Text>
          <TouchableOpacity
            style={styles.githubButton}
            onPress={openGithubLink}
            activeOpacity={0.7}
          >
            <Text style={styles.githubButtonText}>
              View on GitHub →
            </Text>
          </TouchableOpacity>
        </Card>
      ) : null}
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
    paddingTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  techBadge: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  techText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  warningText: {
    fontSize: 13,
    color: "#d97706",
    fontStyle: "italic",
    marginBottom: 10,
  },
  githubButton: {
    backgroundColor: "#24292e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  githubButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});