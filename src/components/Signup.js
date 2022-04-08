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
    try {
      const isUserType = formState.isUser === true ? "/user" : "/ranger";
      const response = await axios.post(
        API_BASE_URL + "/signup" + isUserType,
        formState
      );

      console.log(response.data);
      navigate("/profile");
      addUserToContext(response.data.user);
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
