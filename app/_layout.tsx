import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

function AppNavigation() {
  const { user, loading }: any = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "card",
        gestureEnabled: true,
        animationDuration: 100,
      }}
    >
      {user ? (
        // Logged-in routes
        <Stack.Screen name="(tabs)" />
      ) : (
        // Auth routes
        <Stack.Screen name="(auth)" />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigation />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
