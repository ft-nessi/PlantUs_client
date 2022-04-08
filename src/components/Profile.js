import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import { AuthContext } from "../context/AuthProviderWrapper";

export function Profile() {
  const navigate = useNavigate();
  const { user, removeUserFromContext } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const logout = async () => {
    try {
      const response = await axios.post(API_BASE_URL + "/logout");
      console.log(response.data);
      removeUserFromContext();
    } catch (err) {
      alert("There was an error logging out");
    }
  };

  return (
    <div>
      <h3>Your Profile</h3>
      {user && <h2>Welcome, {user.username}</h2>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
