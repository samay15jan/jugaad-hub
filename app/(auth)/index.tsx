import BackgroundBalls from "@/components/auth/BackgroundBalls";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, error }: any = useAuth();

  const handleSubmit = () => {
    isLogin ? login(email, password) : register(email, password);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Dismiss Keyboard on tap */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <BackgroundBalls />
          {/* Header */}
          <View className="items-center mb-6">
            <Text className="text-white text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Join Sparklines"}
            </Text>
            <Text className="text-neutral-400 text-base">
              {isLogin
                ? "Embrace the Rhythm of Your Soul"
                : "Create your account and get started"}
            </Text>
          </View>

          {/* Inputs */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="bg-neutral-800 text-white p-4 rounded mb-3 text-lg"
            placeholderTextColor="#777"
            keyboardType="email-address"
            selectionColor="#00FF7F"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            className="bg-neutral-800 text-white p-4 rounded mb-6 text-lg"
            placeholderTextColor="#777"
            secureTextEntry
            selectionColor="#00FF7F"
            autoCapitalize="none"
          />

          {/* Error */}
          {error && (
            <Text className="text-red-500 text-center mb-6">{error}</Text>
          )}

          {/* Submit */}
          <TouchableOpacity
            className="bg-[#00ff7f] p-4 rounded"
            onPress={handleSubmit}
          >
            <Text className="text-black text-center font-bold text-lg">
              {isLogin ? "Login" : "Register"}
            </Text>
          </TouchableOpacity>

          {/* Toggle Login/Register */}
          <TouchableOpacity
            className="mt-4"
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text className="text-neutral-400 text-center">
              {isLogin ? "New to Sparklines? " : "Already have an account? "}
              <Text className="text-white font-semibold">
                {isLogin ? "Sign Up" : "Login"}
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
