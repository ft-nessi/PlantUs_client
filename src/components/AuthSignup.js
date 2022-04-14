import { useState } from "react";
import { ConfirmPasswordInputField } from "./ConfirmPasswordInputField";
import { PasswordInputField } from "./PasswordInputField";

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
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordChange = (evnt) => {
    const passwordInputValue = evnt.target.value;
    const passwordInputFieldName = evnt.target.name;
    const NewPasswordInput = {
      ...passwordInput,
      [passwordInputFieldName]: passwordInputValue,
    };
    setPasswordInput(NewPasswordInput);
    setFormState({...formState, password: passwordInputValue});
  };

  const handleValidation = (evnt) => {
    const passwordInputValue = evnt.target.value;
    const passwordInputFieldName = evnt.target.name;
    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{6,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 6 characters";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }
    // for confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        passwordInput.confirmPassword.length > 0)
    ) {
      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError("Confirm password is not matched");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

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
            <br />
            <input
              type="text"
              name="username"
              value={formState.username}
              placeholder="Username"
              onChange={handleFormState}
            />
            <br />
            <input
              type="text"
              name="firstname"
              value={formState.firstname}
              placeholder="Firstname"
              onChange={handleFormState}
            />
            <br />
            <input
              type="email"
              name="email"
              value={formState.email}
              placeholder="Email"
              onChange={handleFormState}
            />
            {/* <input
              type="password"
              name="password"
              value={formState.password}
              placeholder="Password"
              onChange={handleFormState}
            /> */}
            <br/>
            <PasswordInputField
              handlePasswordChange={handlePasswordChange}
              handleValidation={handleValidation}
              passwordValue={passwordInput.password}
              passwordError={passwordError}
            />
            <ConfirmPasswordInputField
              handlePasswordChange={handlePasswordChange}
              handleValidation={handleValidation}
              confirmPasswordValue={passwordInput.confirmPassword}
              confirmPasswordError={confirmPasswordError}
            />
            <p
              className="text-danger"
              style={{ color: "red", fontSize: "0.5em" }}
            >
              {passwordError && "Error in password field:"} <br />{" "}
              {passwordError}
            </p>
            <p
              className="text-danger"
              style={{ color: "red", fontSize: "0.5em" }}
            >
              {confirmPasswordError && "Error in confirm field:"} <br />{" "}
              {confirmPasswordError}
            </p>
            <button className="btn-signup" type="submit">
              {submitButtonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
