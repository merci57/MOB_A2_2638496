// ============================================================
// PROFILE EDITOR SCREEN
// Allows the user to edit their profile info and manage
// their profile picture (camera or gallery).
// Includes validation with field-level error messages.
// ============================================================

import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { usePortfolio } from "../context/PortfolioContext";
import { Card } from "../components/Card";

export const ProfileEditorScreen = () => {
  const { profile, saveProfile, imageUri, saveImage } = usePortfolio();

  // Controlled inputs
  const [headline, setHeadline] = useState(profile.headline);
  const [biography, setBiography] = useState(profile.biography);
  const [primarySkill, setPrimarySkill] = useState(profile.primarySkill);
  const [availability, setAvailability] = useState(profile.availability);

  // Error messages per field
  const [errors, setErrors] = useState<any>({});

  // ---------------------------------------------
  // VALIDATION
  // ---------------------------------------------
  const validate = () => {
    const newErrors: any = {};

    // Rule 1: headline must be at least 3 characters
    if (!headline || headline.trim().length < 3) {
      newErrors.headline = "Headline must be at least 3 characters.";
    }

    // Rule 2: biography must be at least 20 characters
    if (!biography || biography.trim().length < 20) {
      newErrors.biography = "Biography must be at least 20 characters.";
    }

    // Rule 3: primarySkill is required
    if (!primarySkill || primarySkill.trim().length < 2) {
      newErrors.primarySkill = "Primary skill is required.";
    }

    // Rule 4: availability is required
    if (!availability || availability.trim().length === 0) {
      newErrors.availability = "Availability status is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------------------------
  // SAVE
  // ---------------------------------------------
  const handleSave = async () => {
    if (!validate()) {
      Alert.alert("Validation Error", "Please fix the errors before saving.");
      return;
    }

    await saveProfile({
      ...profile,
      headline: headline.trim(),
      biography: biography.trim(),
      primarySkill: primarySkill.trim(),
      availability: availability.trim(),
    });

    Alert.alert("Success", "Your profile has been saved!");
  };

  // ---------------------------------------------
  // IMAGE PICKER - GALLERY
  // ---------------------------------------------
  const pickFromGallery = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "We need access to your photos to select a profile image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      await saveImage(result.assets[0].uri);
    }
  };

  // ---------------------------------------------
  // IMAGE PICKER - CAMERA
  // ---------------------------------------------
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "We need access to your camera to take a profile photo."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      await saveImage(result.assets[0].uri);
    }
  };

  // ---------------------------------------------
  // REMOVE IMAGE
  // ---------------------------------------------
  const removeImage = async () => {
    Alert.alert(
      "Remove Photo",
      "Are you sure you want to remove your profile photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await saveImage(null);
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* ---------------- PROFILE IMAGE ---------------- */}
        <Card title="Profile Photo">
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.preview} />
          ) : (
            <View style={[styles.preview, styles.previewPlaceholder]}>
              <Text style={styles.placeholderText}>No photo</Text>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pickFromGallery}>
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>

          {imageUri ? (
            <TouchableOpacity
              style={[styles.button, styles.buttonDanger]}
              onPress={removeImage}
            >
              <Text style={[styles.buttonText, styles.buttonTextDanger]}>
                Remove Photo
              </Text>
            </TouchableOpacity>
          ) : null}
        </Card>

        {/* ---------------- EDITABLE FIELDS ---------------- */}
        <Card title="Edit Profile Information">
          {/* Headline */}
          <Text style={styles.label}>Headline</Text>
          <TextInput
            style={styles.input}
            value={headline}
            onChangeText={setHeadline}
            placeholder="e.g. Software Engineering Student"
            placeholderTextColor="#999"
          />
          {errors.headline ? (
            <Text style={styles.error}>{errors.headline}</Text>
          ) : null}

          {/* Biography */}
          <Text style={styles.label}>Biography</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={biography}
            onChangeText={setBiography}
            placeholder="Write a short biography..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          {errors.biography ? (
            <Text style={styles.error}>{errors.biography}</Text>
          ) : null}

          {/* Primary Skill */}
          <Text style={styles.label}>Primary Skill</Text>
          <TextInput
            style={styles.input}
            value={primarySkill}
            onChangeText={setPrimarySkill}
            placeholder="e.g. Java, React Native"
            placeholderTextColor="#999"
          />
          {errors.primarySkill ? (
            <Text style={styles.error}>{errors.primarySkill}</Text>
          ) : null}

          {/* Availability */}
          <Text style={styles.label}>Availability</Text>
          <TextInput
            style={styles.input}
            value={availability}
            onChangeText={setAvailability}
            placeholder="e.g. Available for internship"
            placeholderTextColor="#999"
          />
          {errors.availability ? (
            <Text style={styles.error}>{errors.availability}</Text>
          ) : null}

          {/* Save button */}
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleSave}
          >
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
              Save Profile
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    paddingBottom: 32,
  },
  preview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  previewPlaceholder: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#888",
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
    color: "#222",
  },
  textArea: {
    height: 100,
  },
  error: {
    color: "#d32f2f",
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#eeeeee",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#007AFF",
    marginTop: 24,
  },
  buttonDanger: {
    backgroundColor: "#ffebee",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  buttonTextPrimary: {
    color: "#ffffff",
  },
  buttonTextDanger: {
    color: "#d32f2f",
  },
});