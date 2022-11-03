import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Dashboard = () => {
  const auth = useAuth();
  const user = auth?.currentUser;
  const userRoles = auth?.loggedUserRoles;
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    emailVerified: "",
    uid: "",
  });
  const navigate = useNavigate();

  async function handleLogout() {
    setErrorMessage("");
    try {
      await auth.logOut();
      navigate("/signin");
    } catch (error) {
      setErrorMessage("Não foi possível sair!!!");
    }
  }

  useEffect(() => {
    if (user !== null) {
      // console.log(user);
      setUserData({
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        emailVerified: user?.emailVerified,
        uid: user?.uid,
      });
    }
  }, []);

  return (
    <div>
      {errorMessage}
      <h1>Dashboard</h1>
      <br />
      <p>Welcome!!!{userData?.displayName}</p>
      <br />
      <h2>Dados da conta</h2>
      <p>Nome: {userData?.displayName}</p>
      <img src={`${userData?.photoURL}`} alt="Foto" />
      <p>email: {userData?.email}</p>
      <p>emailVerified: {userData?.emailVerified ? "Sim" : "Não"}</p>
      <p>uid: {userData?.uid}</p>
      <p>Roles:</p>
      {userRoles.map((u, i) => (
        <span key={i}>{u}</span>
      ))}
      <br />
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Dashboard;
