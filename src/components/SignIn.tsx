import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const SignIn = () => {
  const auth = useAuth();
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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
      await auth?.login(formData["email"], formData["password"]);
      if(auth?.currentUser){
        navigate('/dashboard')
      }
    } catch (error) {
      setErrorMessage("Não foi possível entrar!");
    }
  }

  // if(auth?.currentUser){
  //   return <Navigate replace to={"/"}/>
  // }

  return (
    <>
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <h1>ENTRAR</h1>
          </div>
          <div className="form-body">
            {errorMessage ? (
              <>
                <p style={{ color: "red" }}>{errorMessage}</p>
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
              <button type="submit">Entrar</button>
            </form>
          </div>
          <div className="form-footer">
            <p>Não possui uma conta? </p> <Link to="/signup">Cadastrar</Link>
            <p>
              Esqueceu a senha?{" "}
              <Link to={"/forgot-password"}>Redefinir a senha</Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default SignIn;
