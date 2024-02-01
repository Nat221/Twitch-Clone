import React, { useState } from "react";
import { Logo } from "./Logo.js";

import {
  validateEmail,
  emailValidationMessage,
} from "../shared/validators/validateEmail.js";
import {
  passwordValidationMessage,
  validatePassword,
} from "../shared/validators/validatePassword.js";
import { useLogin } from "../shared/hooks/useLogin.js";
import { Input } from "../shared/components/Input.js";

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();

  const [formState, setFormState] = useState({
    email: { value: "", isValid: false, showError: false },
    password: { value: "", isValid: false, showError: false },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], value },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }

    setFormState((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], isValid, showError: !isValid },
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(formState.email.value, formState.password.value);
  };

  const isSubmittButtonDisabled =
    isLoading || !formState.password.isValid || !formState.email.isValid;

  return (
    <div className="login-container">
      <Logo text={"Login to Twitch Clone"} />
      <form className="auth-form">
        <Input
          field="email"
          label="Email"
          value={formState.email.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.email.showError}
          validationMessage={emailValidationMessage}
        />
        <Input
          field="password"
          label="Password"
          value={formState.password.value}
          onChangeHandler={handleInputValueChange}
          type="password"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.password.showError}
          validationMessage={passwordValidationMessage}
        />
        <button onClick={handleLogin} disabled={isSubmittButtonDisabled}>
          Log in
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        Don't have account? Please sign up.
      </span>
    </div>
  );
};
