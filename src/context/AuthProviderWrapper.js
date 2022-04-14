import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../consts";

export const AuthContext = createContext();

export function AuthProviderWrapper(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading ] = useState(true);

  const addUserToContext = (newUser) => {
    if (user !== null) return;
    setUser(newUser);
    console.log("this is the user", newUser);
  };
  
  useEffect( ()=> {

    async function tryLogin () {
      try {
        const response = await axios.get(API_BASE_URL + "/user");
        console.log(response.data);
        addUserToContext(response.data.user);
      } catch (err) {
        
      } finally {
        setIsLoading(false)
      }
    }
    tryLogin();
  },)

  const removeUserFromContext = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading ,addUserToContext, removeUserFromContext }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
