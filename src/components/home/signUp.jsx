import Button from '@components/ui/button';
import Input from '@components/ui/input';
import useValidation from '@hooks/use-Validation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function SignUp({signup}) {
  const [formIsValid, setFormIsValid] = useState(false);

  // FORM VALIDATION USING CUSTOM HOOK
  const userName = useValidation(/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i);
  const { inputState: userNameState, dispatchInput: dispatchUserName } =
    userName;
  const email = useValidation(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const { inputState: emailState, dispatchInput: dispatchEmail } = email;
  const password = useValidation(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  );
  const { inputState: passwordState, dispatchInput: dispatchPassword } =
    password;
  const displayName = useValidation(/^[A-Za-z].{3,}\S+$/);
  const { inputState: displayNameState, dispatchInput: dispatchDisplayName } =
    displayName;

  useEffect(() => {
    if (
      userNameState.isValid &&
      emailState.isValid &&
      passwordState.isValid &&
      displayNameState.isValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    userNameState.isValid,
    emailState.isValid,
    passwordState.isValid,
    displayNameState.isValid,
  ]);

  const userNameInputHandler = (e) => {
    dispatchUserName({ type: 'USERNAME_INPUT', val: e.target.value });
  };

  const emailInputHandler = (e) => {
    dispatchEmail({ type: 'EMAIL_INPUT', val: e.target.value });
  };

  const passwordInputHandler = (e) => {
    dispatchPassword({ type: 'PASSWORD_INPUT', val: e.target.value });
  };

  const displayNameInputHandler = (e) => {
    dispatchDisplayName({ type: 'DISPLAYNAME_INPUT', val: e.target.value });
  };

  const signupFormHandler = (e) => {
    e.preventDefault();

    signup.postRequest({
      email: emailState.value,
      password: passwordState.value,
      username: userNameState.value,
      displayName: displayNameState.value,
    });

    dispatchUserName({ type: 'USERNAME_INPUT', val: '' });
    dispatchEmail({ type: 'EMAIL_INPUT', val: '' });
    dispatchPassword({ type: 'PASSWORD_INPUT', val: '' });
    dispatchDisplayName({ type: 'DISPLAYNAME_INPUT', val: '' });

    console.log({
      name: userNameState.value,
      pwd: passwordState.value,
      mail: emailState.value,
      disp: displayNameState.value,
    });
  };

  return (
    <>
      <div className="pt-24 sm:mt-24 sm:pt-0">
        <h1 className="w-min text-5xl font-bold mx-auto">LOGO</h1>
      </div>
      <div className="w-8/12 mx-auto mt-6">
        <form onSubmit={signupFormHandler} className="flex flex-col gap-3">
          <Input
            id="username"
            type="text"
            value={userNameState.value}
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Username"
            onChange={userNameInputHandler}
          />
          <Input
            id="email"
            type="email"
            value={emailState.value}
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Email Address"
            onChange={emailInputHandler}
          />
          <Input
            id="password"
            type="password"
            value={passwordState.value}
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Password"
            onChange={passwordInputHandler}
          />
          <Input
            id="displayname"
            type="text"
            value={displayNameState.value}
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Display name"
            onChange={displayNameInputHandler}
          />
          <small className="block mt-1">
            By signing up, you agree to the terms and condition{' '}
            <span className="font-bold underline">Terms of services</span> and
            privacy policy, including{' '}
            <span className="font-bold underline">cookie use</span>
          </small>
          <Button
            type="submit"
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
        <div className="min-w-fit flex flex-row justify-center gap-8 mt-4 items-center">
          <span className="text-slate-400">
            &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;
          </span>
          <p className="w-2 text-lg">or</p>
          <span className="text-slate-400">
            &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;
          </span>
        </div>
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
          <small className="block mt-0 mx-auto">
            Already have an account?
            <Link href='/login' className="font-bold">
              Sign in
            </Link>
          </small>
        </div>
      </div>
    </>
  );
}

export default SignUp;
