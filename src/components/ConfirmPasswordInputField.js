export function ConfirmPasswordInputField({
  handleValidation,
  handlePasswordChange,
  confirmPasswordValue,
  confirmPasswordError,
}) {
  return (
    <div>
        <input
          type="password"
          value={confirmPasswordValue}
          onChange={handlePasswordChange}
          onKeyUp={handleValidation}
          name="confirmPassword"
          placeholder="Confirm password"
        //   className="form-control"
        />
        {/* <p className="text-danger">{confirmPasswordError}</p> */}
        {console.log({confirmPasswordError})}
    </div>
  );
}
