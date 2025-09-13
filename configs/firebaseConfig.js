import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCpUGwp6d4Ubvj3C8aWjTqj5wBZyGJGsa8",
    authDomain: "jugaad-hub.firebaseapp.com",
    projectId: "jugaad-hub",
    storageBucket: "jugaad-hub.firebasestorage.app",
    messagingSenderId: "375865253946",
    appId: "1:375865253946:web:9216ee06212bb61a821503"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
