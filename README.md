My name is UMUBYEYI Marie Merci.

# UMMPortifolio

A personal portfolio mobile application built with React Native and Expo.

## Student Information

- **Full Name:** UMUBYEYI Marie Merci
- **Registration Number:** 2638496
- **Verification Code:** MOB-A2-8496
- **App Name:** UMMPortifolio

## Purpose

This app was built for the Mobile Application Development (SWE 3409) Individual Assignment 2. It serves as a personal portfolio that can be installed on an Android device and viewed offline during an internship interview.

## Features

- Home screen with the required introduction sentence, profile photo/avatar, professional headline, biography, and verification code.
- Skills & Education screen showing 5 skills with honest level indicators and an education timeline.
- Projects screen with 2 genuine student projects (Les Gateaux, ScholarMS), each with a separate detail screen showing problem, contribution, and technologies.
- Profile editor with 4 controlled input fields and 4 validation rules with field-level error messages.
- Camera/Gallery workflow for profile photo with permission handling.
- Local persistence using AsyncStorage (survives app restart).
- Offline-first design - core features work without internet.
- Bottom tabs navigation + stack navigation for project details.

## Setup and Run

### Prerequisites

- Node.js (v18 or higher)
- npm
- Expo CLI
- EAS CLI (npm install -g eas-cli)

### Installation

npm install

### Run in development

npx expo start

Then press w for web, or scan the QR code with Expo Go on your phone.

### Build the APK

eas build -p android --profile preview

## Tested Device

- **Device:** itel A60
- **Android version:** Android 12
- **Test date:** 10 October 2026

## Technical Stack

- React Native (Expo SDK 57)
- TypeScript
- React Navigation (bottom tabs + native stack)
- AsyncStorage for persistence
- expo-image-picker for camera/gallery

## Known Limitations

- The GitHub link inside each project card requires an internet connection (clearly labeled in the app).
- The app does not sync data to any cloud service.
- All data is stored locally on the device only.

## Repository

- GitHub Repository: https://github.com/merci57/MOB_A2_2638496
- GitHub Release: https://github.com/merci57/MOB_A2_2638496/releases/tag/v1.0.0
- APK Download: https://github.com/merci57/MOB_A2_2638496/releases/download/v1.0.0/MOB_A2_2638496.apk
- Demo Video: https://github.com/merci57/MOB_A2_2638496/releases/download/v1.0.0/MOB_A2_2638496_DEMO.mp4
- Final commit hash: 35238da

## Declaration

I declare that this project is my own work. All personal information and project descriptions are genuine. See evidence/AI_USE.md for details on AI assistance.