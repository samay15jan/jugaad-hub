import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function AuthMenu() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, error }: any = useAuth();

  const handleSubmit = () => {
    isLogin ? login(email, password) : register(email, password);
  };

  return (
    <View className="h-screen">
      {/* Dismiss Keyboard on tap */}
      <View className="absolute w-screen h-1/2 bottom-0 items-center pb-16">
        <Text className="text-white text-5xl font-bold mb-2 mx-20 text-center">
          {isLogin ? "Let's get you signed in!" : "Join Jugaad Hub"}
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          className="absolute bottom-0 w-screen bg-white p-10 pb-10 rounded-3xl"
          keyboardShouldPersistTaps="handled"
        >
          <View className="">
            {/* Inputs */}
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="bg-gray-100 text-black p-4 rounded mb-3 text-lg"
              placeholderTextColor="#777"
              keyboardType="email-address"
              selectionColor="#00FF7F"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              className="bg-gray-100 text-black p-4 rounded mb-6 text-lg"
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
              <Text className="texnt-neutral-400 text-center">
                {isLogin ? "New to Jugaad hub? " : "Already have an account? "}
                <Text className="text-black font-semibold">
                  {isLogin ? "Register" : "Login"}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}
