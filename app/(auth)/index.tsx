import AuthMenu from "@/components/auth/AuthMenu";
import BackgroundBalls from "@/components/auth/BackgroundBalls";
import {
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <BackgroundBalls />
        <AuthMenu />
    </KeyboardAvoidingView>
  );
}
