import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProviderWrapper(props) {
  const [user, setUser] = useState(null);

  const addUserContext = (newUser) => {
    if (user !== null) return;
    setUser(newUser);
  };

  const removeUserFromContext = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, addUserContext, removeUserFromContext }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
