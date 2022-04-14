export function PasswordInputField({
  handleValidation,
  handlePasswordChange,
  passwordValue,
  passwordError,
}) {
  return (
    <div>
      <input
        type="password"
        value={passwordValue}
        onChange={handlePasswordChange}
        onKeyUp={handleValidation}
        name="password"
        placeholder="Password"
        // className="form-control"
      />
      {/* <p className="text-danger">{passwordError}</p> */}
    </div>
  );
}
