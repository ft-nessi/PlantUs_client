import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";
import { AuthSignup } from "./AuthSignup";

export function Signup() {
  const [errorState, setErrorState] = useState();
  const navigate = useNavigate();
  const { addUserToContext } = useContext(AuthContext);

  const signup = async (formState) => {
    console.log(formState)
    try {
      console.log(API_BASE_URL + "/signup")
      const response = await axios.post(
        API_BASE_URL + "/signup",
        formState
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
      <h3>Signup Page</h3>
      <AuthSignup
        submitButtonText={"Signup!"}
        submitFormAction={signup}
        error={errorState}
      />
    </div>
  );
}
