import { useState } from "react";

export function Authentification({
  submitFormAction,
  submitButtonText,
  error = null,
}) {
  const [formState, setFormState] = useState({
    isUser: true,
    username: "",
    firstname: "",
    password: "",
  });

  const handleFormState = (event) => {
    setFormState(() => {
      if (event.target.id === "user") {
        return ({
          ...formState,
          isUser: true,
          [event.target.name]: event.target.value,
        });
      } else if (event.target.id === "ranger") {
        return ({
          ...formState,
          isUser: false,
          [event.target.name]: event.target.value,
        });} else {
          return ({
          ...formState,
          [event.target.name]: event.target.value,
        })
        }
      }
    );
    console.log("formState", formState);
    console.log("checked", event.target.checked)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitFormAction(formState);
  };
  return (
    <div className="login-signup">
      <div className="login-register-div">
        <input
          id="user"
          type="radio"
          name="tabs"
          onChange={handleFormState}
          // value={true}
          checked
        />
        <label className="tab-label" for="user">
          User
        </label>
        <input
          id="ranger"
          type="radio"
          name="tabs"
          onChange={handleFormState}
        />
        <label className="tab-label" for="ranger">
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
  );
}
