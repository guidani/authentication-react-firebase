import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth as auth } from "../firebase/config";
import { saveUserToDatabase } from "../firebase/saveUserToDatabase";

interface IAuthContext {
  signup: Function;
  login: Function;
  logOut: Function;
  resetPassword: Function;
  currentUser: {
    displayName?: string;
    email?: string;
    photoURL?: string;
    emailVerified?: string;
    uid?: string;
  };
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  async function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data.user);
        const email = data?.user?.email;
        const userId = data?.user?.uid;
        saveUserToDatabase(email!, userId!);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async function login(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(credential);
      localStorage.setItem("u", JSON.stringify(credential));
      return true;
    } catch (error) {
      return console.error(error);
    }
  }

  async function logOut() {
    await signOut(auth);
    localStorage.removeItem("u");
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logOut,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
