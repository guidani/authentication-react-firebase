import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db, firebaseAuth as auth } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggedUserRoles, setLoggedUserRoles] = useState([]);

  async function signup(email, password) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res?.user;
      // Adiciona usuario no banco de dados
      const collectionRef = await collection(db, "users");
      await addDoc(collectionRef, {
        email: email,
        roles: ["student"],
        userid: user?.uid,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function login(email, password) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res?.user;
      const userid = user?.uid;

      // get user doc from firestore
      const q = query(collection(db, "users"), where("userid", "==", userid));

      const querySnapshot = await getDocs(q);
      await querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userData?.roles.forEach((i) => setLoggedUserRoles([i]));

      });
    } catch (error) {
      console.log(error);
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
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logOut,
    resetPassword,
    loggedUserRoles,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
