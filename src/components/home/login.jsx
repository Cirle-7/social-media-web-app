import { useEffect, useReducer, useState } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';

const emailReducer = (state, action) => {
  if (action.type === 'EMAIL_INPUT') {
    return {
      value: action.val,
      isValid:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          action.val
        ),
    };
  }
  return { value: '', isValid: null };
};

const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length >= 8,
    };
  }
  return { value: '', isValid: null };
};

function Login(props) {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  useEffect(() => {
    if (emailState.isValid && passwordState.isValid) setFormIsValid(true);
    else {
      setFormIsValid(false);
    }
  }, [emailState.isValid, passwordState.isValid]);

  const emailInputHandler = (e) => {
    dispatchEmail({ type: 'EMAIL_INPUT', val: e.target.value });
  };

  const passwordInputHandler = (e) => {
    dispatchPassword({ type: 'PASSWORD_INPUT', val: e.target.value });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    console.log(emailState.value, passwordState.value);

    dispatchEmail({ type: 'EMAIL_INPUT', val: '' });
    dispatchPassword({ type: 'PASSWORD_INPUT', val: '' });
    setFormIsValid(false);
  };

  return (
    <>
      <div className="mt-48">
        <h1 className="w-min text-5xl font-bold mx-auto">LOGO</h1>
      </div>
      <div className="w-8/12 mx-auto mt-6">
        <form onSubmit={submitFormHandler} className="flex flex-col gap-3">
          <Input
            type="email"
            value={emailState.value}
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Email Address"
            onChange={emailInputHandler}
          />
          <Input
            value={passwordState.value}
            type="password"
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Password"
            onChange={passwordInputHandler}
          />
          <div className="w-full flex flex-row justify-between">
            <p className="hover:cursor-pointer" onClick={props.onClick}>
              Back to Sign Up
            </p>
            <p>forgot credentials</p>
          </div>
          <Button
            className={
              formIsValid
                ? 'w-full h-10 border-none rounded-lg text-white text-sm bg-slate-900'
                : 'w-full h-10 border-none rounded-lg text-white text-sm bg-slate-400 cursor-not-allowed'
            }
            disabled={!formIsValid}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
