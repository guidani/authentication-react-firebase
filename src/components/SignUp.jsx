import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase/config";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

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
    if (formData["password"] !== formData["passwordconfirmation"]) {
      return setErrorMessage("As senhas não conferem");
    }

    try {
      setErrorMessage("");
      setLoading(true);
      await auth.signup(formData["email"], formData["password"]);
      setLoading(false);
      navigate("/signin");
      // console.log(resp);
    } catch (error) {
      setErrorMessage("Não foi possível criar a conta");
      console.log(error);
    }
  }

  // if (auth?.currentUser) {
  //   return <Navigate replace to={"/"} />;
  // }

  return (
    <>
      {/* {auth?.currentUser
        ? alert(`Usuário criado com o ID ${auth?.currentUser?.uid}`)
        : null} */}
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <h1>CADASTRAR</h1>
          </div>
          <div className="form-body">
            {errorMessage ? (
              <>
                <p style={{ color: "red" }}>As senhas são diferentes</p>
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
              <div className="input-group">
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="******"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="repassword">Digite a senha novamente:</label>
                <input
                  type="password"
                  id="repassword"
                  name="passwordconfirmation"
                  placeholder="******"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Cadastrar</button>
            </form>
          </div>
          <div className="form-footer">
            <p>Já possui uma conta? </p> <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default SignUp;
