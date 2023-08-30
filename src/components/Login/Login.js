import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import AuthContext from "../../context/auth-context.js";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input.js";

const initialEmailState = { value: "", isValid: false };
const initialPasswordState = { value: "", isValid: false };

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        value: action.payload,
        isValid: action.payload.includes("@"),
      };
    case "INPUT_BLUR":
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    default:
      return initialEmailState;
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        value: action.payload,
        isValid: action.payload.trim().length > 6,
      };
    case "INPUT_BLUR":
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    default:
      return initialPasswordState;
  }
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialEmailState
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );
  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {
    let debounceCheckFormInput = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(debounceCheckFormInput);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", payload: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          inputValue={emailState.value}
          isInputValid={emailState.isValid}
          onChangeEvent={emailChangeHandler}
          onBlurEvent={validateEmailHandler}
          ref={emailInputRef}
        >
          E-mail
        </Input>
        <Input
          id="password"
          inputValue={passwordState.value}
          isInputValid={passwordState.isValid}
          onChangeEvent={passwordChangeHandler}
          onBlurEvent={validatePasswordHandler}
          ref={passwordInputRef}
        >
          Password
        </Input>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn} /* disabled={!formIsValid} */
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
