import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth as auth } from "../firebase/config";
import { getUserFromDatabase } from "../firebase/getUserFromDatabase";
import { saveUserToDatabase } from "../firebase/saveUserToDatabase";

interface IAuthContext {
  signup: Function;
  login: Function;
  logOut: Function;
  resetPassword: Function;
  currentUser: {}
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

  function login(email: string, password: string) {
    try {
      return signInWithEmailAndPassword(auth, email, password).then((resp) => {
        setCurrentUser(resp);
        const user = resp?.user;
        const userid = user?.uid;
        getUserFromDatabase(userid).then((resp) => console.log(resp));
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function logOut() {
    return signOut(auth);
  }

  function resetPassword(email) {
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
