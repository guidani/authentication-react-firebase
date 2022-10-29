import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ForgotPassword = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    try {
      setSuccessMessage("");
      setErrorMessage("");
      await auth.resetPassword(formData["email"]);
      setSuccessMessage(
        "O link para resetar sua senha foi enviado para o seu e-mail!"
      );
    } catch (error) {
      setErrorMessage("Não foi possível resetar a senha!");
      console.log(error);
    }
  }

  if (auth?.currentUser) {
    return <Navigate replace to={"/"} />;
  }
  return (
    <>
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <h1>REDEFINIÇÃO DE SENHA</h1>
          </div>
          <div className="form-body">
            {errorMessage ? (
              <>
                <p style={{ color: "red" }}>{errorMessage}</p>
              </>
            ) : null}
            {successMessage ? (
              <>
                <p style={{ color: "green" }}>{successMessage}</p>
              </>
            ) : null}
            <form onSubmit={submitForm}>
              <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Seu melhor e-mail"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit">RESET</button>
            </form>
          </div>
          <div className="form-footer">
            <Link to="/signin">Entrar</Link>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default ForgotPassword;
