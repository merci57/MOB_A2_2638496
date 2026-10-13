// ============================================================
// SKILL ITEM COMPONENT
// Displays one skill with its name and level.
// Used inside the Skills screen.
// ============================================================

import React from "react";
import { View, Text, StyleSheet } from "react-native";

type SkillItemProps = {
  name: string;
  level: string;
};

export const SkillItem = ({ name, level }: SkillItemProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.level}>{level}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  name: {
    fontSize: 16,
    color: "#222",
    flex: 1,
  },
  level: {
    fontSize: 13,
    color: "#007AFF",
    fontWeight: "600",
    backgroundColor: "#e6f2ff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
});