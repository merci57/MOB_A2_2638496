// ============================================================
// SKILLS SCREEN
// Shows the list of skills and the education timeline.
// Uses reusable SkillItem and Card components.
// ============================================================

import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { usePortfolio } from "../context/PortfolioContext";
import { Card } from "../components/Card";
import { SkillItem } from "../components/SkillItem";

export const SkillsScreen = () => {
  const { profile } = usePortfolio();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* ---------------- SKILLS ---------------- */}
      <Card title="My Skills">
        {profile.skills.map((skill: any, index: number) => (
          <SkillItem key={index} name={skill.name} level={skill.level} />
        ))}
      </Card>

      {/* ---------------- EDUCATION ---------------- */}
      <Card title="Education & Training">
        {profile.education.map((item: any, index: number) => (
          <View key={index} style={styles.educationItem}>
            <Text style={styles.year}>{item.year}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.school}>{item.school}</Text>
          </View>
        ))}
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
  educationItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  year: {
    fontSize: 13,
    color: "#007AFF",
    fontWeight: "600",
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  school: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});