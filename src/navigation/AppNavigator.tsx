// ============================================================
// APP NAVIGATOR
// Bottom tab navigation + Stack navigation for project details.
// ============================================================

import React from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import { HomeScreen } from "../screens/HomeScreen";
import { SkillsScreen } from "../screens/SkillsScreen";
import { ProjectsScreen } from "../screens/ProjectsScreen";
import { ProjectDetailScreen } from "../screens/ProjectDetailScreen";
import { ProfileEditorScreen } from "../screens/ProfileEditorScreen";
import { AboutScreen } from "../screens/AboutScreen";

// ---------------- STACK for Projects ----------------
const ProjectsStack = createNativeStackNavigator();

const ProjectsStackNavigator = () => {
  return (
    <ProjectsStack.Navigator>
      <ProjectsStack.Screen
        name="ProjectsList"
        component={ProjectsScreen}
        options={{ title: "Projects" }}
      />
      <ProjectsStack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{ title: "Project Details" }}
      />
    </ProjectsStack.Navigator>
  );
};

// ---------------- BOTTOM TABS ----------------
const Tab = createBottomTabNavigator();

// Simple text icon for each tab
const TabIcon = ({ label, focused }: { label: string; focused: boolean }) => (
  <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    {label}
  </Text>
);

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <TabIcon label="🏠" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Skills"
          component={SkillsScreen}
          options={{
            tabBarLabel: "Skills",
            tabBarIcon: ({ focused }) => (
              <TabIcon label="📚" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsStackNavigator}
          options={{
            tabBarLabel: "Projects",
            tabBarIcon: ({ focused }) => (
              <TabIcon label="💼" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileEditorScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabIcon label="👤" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarLabel: "About",
            tabBarIcon: ({ focused }) => (
              <TabIcon label="ℹ️" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  tabIconFocused: {
    opacity: 1,
  },
});