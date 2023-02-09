import { useEffect, useReducer, useState } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';

const initialState = {
  value: '',
  isValid: null,
};

const nameReducer = (state, action) => {
  if (action.type === 'NAME_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 5,
    };
  }
  return initialState;
};

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

  return initialState;
};

const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length >= 8,
    };
  }

  return initialState;
};

function SignUp(props) {
  const [confirm, setConfirm] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const [nameState, dispatchName] = useReducer(nameReducer, initialState);
  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialState
  );

  useEffect(() => {
    if (
      nameState.isValid &&
      emailState.isValid &&
      passwordState.isValid &&
      passwordState.value === confirm
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    nameState.isValid,
    emailState.isValid,
    passwordState.isValid,
    passwordState.value,
    confirm,
  ]);

  const nameInputHandler = (e) => {
    dispatchName({ type: 'NAME_INPUT', val: e.target.value });
  };

  const emailInputHandler = (e) => {
    dispatchEmail({ type: 'EMAIL_INPUT', val: e.target.value });
  };

  const passwordInputHandler = (e) => {
    dispatchPassword({ type: 'PASSWORD_INPUT', val: e.target.value });
  };

  const passwordConfirmHandler = (e) => {
    setConfirm(e.target.value);
  };

  const signupFormHandler = (e) => {
    e.preventDefault();

    console.log(nameState.value, emailState.value, passwordState.value);

    dispatchName({ type: 'NAME_INPUT', val: '' });
    dispatchEmail({ type: 'EMAIL_INPUT', val: '' });
    dispatchPassword({ type: 'PASSWORD_INPUT', val: '' });
    setConfirm('')
  };

  return (
    <>
      <div className="mt-24">
        <h1 className="w-min text-5xl font-bold mx-auto">LOGO</h1>
      </div>
      <div className="w-8/12 mx-auto mt-6">
        <form onSubmit={signupFormHandler} className="flex flex-col gap-3">
          <Input
            type="text"
            value={nameState.value}
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Name"
            onChange={nameInputHandler}
          />
          <Input
            type="email"
            value={emailState.value}
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Email Address"
            onChange={emailInputHandler}
          />
          <Input
            type="password"
            value={passwordState.value}
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Password"
            onChange={passwordInputHandler}
          />
          <Input
            type="password"
            value={confirm}
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Confirm Password"
            onChange={passwordConfirmHandler}
          />

          <Button
            disabled={!formIsValid}
            className={
              formIsValid
                ? 'w-full h-10 border-none rounded-lg text-white text-sm bg-slate-900'
                : 'w-full h-10 border-none rounded-lg text-white text-sm bg-slate-400 cursor-not-allowed'
            }
          >
            Sign Up
          </Button>
        </form>
        <p className="w-2 text-lg block mx-auto mt-4">or</p>
        <div className="w-56 mx-auto mt-4 flex flex-col gap-3">
          <Button className="w-full h-10 border-none rounded-lg text-white text-sm bg-slate-900">
            Sign up with Google
          </Button>
          <Button className="w-full h-10 border-none rounded-lg text-white text-sm bg-slate-900">
            Sign up with Apple
          </Button>
          <Button className="w-full h-10 border-none rounded-lg text-white text-sm bg-slate-900">
            Sign up with Phone Number
          </Button>
        </div>
        <small className="block mt-4">
          By signing up, you agree to the terms and condition{' '}
          <span className="font-bold underline">Terms of services</span> and
          privacy policy, including{' '}
          <span className="font-bold underline">cookie use</span>
        </small>
        <small className="block mt-2">
          Already have an account?
          <Button onClick={props.onClick} className="font-bold">
            Sign in
          </Button>
        </small>
      </div>
    </>
  );
}

export default SignUp;
