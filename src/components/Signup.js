import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { AuthSignup } from "./AuthSignup";

export function Signup() {
  const [errorState, setErrorState] = useState();
  const navigate = useNavigate();

  const signup = async (formState) => {
    try{
      const isUserType = formState.isUser === true ? "/user" : "/ranger" 
      const response = await axios.post(API_BASE_URL + "/signup" + isUserType, formState);

      console.log(response.data);
      navigate("/profile");

    }catch(err){
      setErrorState(err)
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
