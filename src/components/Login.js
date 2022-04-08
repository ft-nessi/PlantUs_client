import axios from "axios";
import { useState, loginState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";
import { AuthLogin } from "./AuthLogin";

export function Login() {
  const [errorState, setErrorState] = useState();
  const navigate = useNavigate();
  const { addUserToContext } = useContext(AuthContext);
  const login = async (loginState) => {
    try {
      console.log("loginState", loginState);
      // console.log("Is axios using credentials:", axios.defaults.withCredentials)

      const response = await axios.post(
        API_BASE_URL + "/login/ranger",
        loginState
      );
      console.log(response.data);
      addUserToContext(response.data.user);
      navigate("/profile");
    } catch (err) {
      setErrorState(err);
    }
  };

  return (
    <div>
      <h3>Login Page</h3>
      <AuthLogin
        submitButtonText={"Login!"}
        submitFormAction={login}
        error={errorState}
      />
    </div>
  );
}
