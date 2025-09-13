import * as SecureStore from "expo-secure-store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "../configs/firebaseConfig.js";

const saveToSecureStore = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

const getFromSecureStore = async (key) => {
  return await SecureStore.getItemAsync(key);
};

const deleteFromSecureStore = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

const firebaseRegister = async (email, password) => {
  try {
    if (!email.endsWith("@s.amity.edu")) {
      alert("Please use your Amity email address");
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await saveToSecureStore("email", user.email);
    await saveToSecureStore("userId", user.uid);

    return user;
  } catch (error) {
    throw error.message;
  }
};

const firebaseLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await saveToSecureStore("email", user.email);
    await saveToSecureStore("userId", user.uid);

    return user;
  } catch (error) {
    throw error.message;
  }
};

// Logout
const logout = async () => {
  try {
    await signOut(auth);

    await deleteFromSecureStore("email");
    await deleteFromSecureStore("userId");

    console.log("signed out");
    return;
  } catch (error) {
    throw error.message;
  }
};

export { firebaseLogin, firebaseRegister, getFromSecureStore, logout };

