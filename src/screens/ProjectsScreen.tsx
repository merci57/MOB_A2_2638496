// ============================================================
// PROJECTS SCREEN
// Shows the list of student projects.
// Each project is clickable and opens a detail screen.
// ============================================================

import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { usePortfolio } from "../context/PortfolioContext";
import { Card } from "../components/Card";

export const ProjectsScreen = ({ navigation }: any) => {
  const { profile } = usePortfolio();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.pageTitle}>My Projects</Text>

      {profile.projects.map((project: any) => (
        <TouchableOpacity
          key={project.id}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("ProjectDetail", { project })
          }
        >
          <Card title={project.title}>
            <Text style={styles.problemLabel}>Problem:</Text>
            <Text style={styles.problemText}>{project.problem}</Text>
            <Text style={styles.tapHint}>Tap to see details →</Text>
          </Card>
        </TouchableOpacity>
      ))}
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
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 8,
    color: "#222",
  },
  problemLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 6,
    marginBottom: 2,
  },
  problemText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  tapHint: {
    fontSize: 13,
    color: "#007AFF",
    marginTop: 10,
    fontStyle: "italic",
  },
});