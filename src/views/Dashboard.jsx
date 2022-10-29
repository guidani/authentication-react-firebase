import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Dashboard = () => {
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
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

  return (
    <div>
      {errorMessage}
      <h1>Dashboard</h1>
      <br />
      <p>Welcome!!!{auth?.currentUser?.email}</p>
      <br />
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Dashboard;
