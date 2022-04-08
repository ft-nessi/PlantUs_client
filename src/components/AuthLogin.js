import { useState } from "react";

export function AuthLogin({
  submitFormAction,
  submitButtonText,
  error = null,
}) {
  const [loginState, setLoginState] = useState({
    isUser: true,
    email: "",
    password: "",
  });

  const handleUserTypeChange = (event) => {
    setLoginState({
      ...loginState,
      isUser: event.target.value === "user",
    });
  };

  const handleLoginState = (event) => {
    setLoginState({
      ...loginState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitFormAction(loginState);
  };
  return (
    <div className="container-form">
      <div className="login-signup">
        <div className="login-register-div">
          <input
            id="user"
            type="radio"
            name="tabs"
            onChange={handleUserTypeChange}
            checked={loginState.isUser}
            value="user"
          />
          <label className="tab-label" htmlFor="user">
            User
          </label>
          <input
            id="ranger"
            type="radio"
            name="tabs"
            onChange={handleUserTypeChange}
            checked={!loginState.isUser}
            value="ranger"
          />
          <label className="tab-label" htmlFor="ranger">
            Ranger
          </label>
          <form onSubmit={handleSubmit}>
            {error && error.message}
            <input
              type="email"
              name="email"
              value={loginState.email}
              placeholder="Email"
              onChange={handleLoginState}
            />
            <input
              type="password"
              name="password"
              value={loginState.password}
              placeholder="Password"
              onChange={handleLoginState}
            />
            <button className="btn-signup" type="submit">
              {submitButtonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
