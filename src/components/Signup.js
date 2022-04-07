import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { Authentification } from "./Authentification";

export function Signup() {
  const [errorState, setErrorState] = useState();
  const navigate = useNavigate();

  const signup = async (formState) => {
    console.log("formState", formState);
    const isUserType = formState.isUser === true ? "/user" : "/ranger" 
    const response = await axios.post(API_BASE_URL + "/signup" + isUserType, formState);

    console.log(response.data);
    navigate("/profile");
  };

  return (
    <div>
      <h3>Signup Page</h3>
      <Authentification
        submitButtonText={"Signup!"}
        submitFormAction={signup}
        error={errorState}
      />
    </div>
  );
}
