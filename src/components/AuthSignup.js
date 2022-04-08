import { useState } from "react";

export function AuthSignup({
  submitFormAction,
  submitButtonText,
  error = null,
}) {
  const [formState, setFormState] = useState({
    isUser: true,
    username: "",
    firstname: "",
    email: "",
    password: "",
  });

  const handleUserTypeChange = (event) => {
    setFormState({
      ...formState,
      isUser: event.target.value === "user",
    });
  };

  const handleFormState = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitFormAction(formState);
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
            checked={formState.isUser}
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
            checked={!formState.isUser}
            value="ranger"
          />
          <label className="tab-label" htmlFor="ranger">
            Ranger
          </label>
          <form onSubmit={handleSubmit}>
            {error && error.message}
            <input
              type="text"
              name="username"
              value={formState.username}
              placeholder="Username"
              onChange={handleFormState}
            />
            <input
              type="text"
              name="firstname"
              value={formState.firstname}
              placeholder="Firstname"
              onChange={handleFormState}
            />
            <input
              type="email"
              name="email"
              value={formState.email}
              placeholder="Email"
              onChange={handleFormState}
            />
            <input
              type="password"
              name="password"
              value={formState.password}
              placeholder="Password"
              onChange={handleFormState}
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
