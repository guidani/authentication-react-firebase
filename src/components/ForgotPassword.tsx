import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ForgotPassword = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({});


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
      return await auth?.resetPassword(formData["email"]);
      
    } catch (error) {
      console.log(error);
    }
  }

  // if (auth?.currentUser) {
  //   return <Navigate to={"/"} />;
  // }
  return (
    <>
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <h1>REDEFINIÇÃO DE SENHA</h1>
          </div>
          <div className="form-body">
           
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
