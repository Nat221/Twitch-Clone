import React, { useState } from "react";
import { Logo } from "./Logo.js";
import { Input } from "../shared/components/Input.js";
import {
  validateEmail,
  emailValidationMessage,
} from "../shared/validators/validateEmail.js";
import {
  passwordValidationMessage,
  validatePassword,
} from "../shared/validators/validatePassword.js";
import {
  usernameValidationMessage,
  validateUsername,
} from "../shared/validators/validateUsername.js";
import {
  passwordConfValidationMessage,
  validatePasswordConf,
} from "../shared/validators/validatePasswordConf.js";
import { useRegister } from "../shared/hooks/useRegister.js";

export const Register = ({ switchAuthHandler }) => {
  const { isLoading, register } = useRegister();
  const [formState, setFormState] = useState({
    email: { value: "", isValid: false, showError: false },
    password: { value: "", isValid: false, showError: false },
    username: { value: "", isValid: false, showError: false },
    passwordConf: { value: "", isValid: false, showError: false },
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
      case "username":
        isValid = validateUsername(value);
        break;
      case "passwordConf":
        isValid = validatePasswordConf(formState.password.value, value);
        break;
      default:
        break;
    }

    setFormState((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], isValid, showError: !isValid },
    }));

    console.log(formState);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const response = await register(
      formState.email.value,
      formState.password.value,
      formState.username.value
    );
  };

  const isSubmitButtonDisabled =
    !formState.password.isValid ||
    !formState.email.isValid ||
    !formState.username.isValid ||
    formState.password.value !== formState.passwordConf.value ||
    isLoading;

  return (
    <div className="register-container">
      <Logo text={"Sign up to Twitch Clone"} />
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
          field="username"
          label="Username"
          value={formState.username.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.username.showError}
          validationMessage={usernameValidationMessage}
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

        <Input
          field="passwordConf"
          label="Password confirmation"
          value={formState.passwordConf.value}
          onChangeHandler={handleInputValueChange}
          type="password"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.passwordConf.showError}
          validationMessage={passwordConfValidationMessage}
        />
        <button onClick={handleRegister} disabled={isSubmitButtonDisabled}>
          Register
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        Already have an account? Sign in.
      </span>
    </div>
  );
};
