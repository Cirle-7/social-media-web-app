import Link from 'next/link';
import { useEffect, useState } from 'react';
import useValidation from '@hooks/use-Validation';
import Button from '@ui/button';
import Input from '@ui/input';

function Login({login}) {
  const [formIsValid, setFormIsValid] = useState(false);

  // FORM VALIDATION WITH CUSTOM HOOKS
  const email = useValidation(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const password = useValidation(/^(?=.*\d).{8,}$/);
  const { inputState: emailState, dispatchInput: dispatchEmail } = email;
  const { inputState: passwordState, dispatchInput: dispatchPassword } =
    password;

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

  const submitFormHandler = async (e) => {
    e.preventDefault();

    login.postRequest({
      email: emailState.value,
      password: passwordState.value,
    });

    dispatchEmail({ type: 'EMAIL_INPUT', val: '' });
    dispatchPassword({ type: 'PASSWORD_INPUT', val: '' });
    setFormIsValid(false);
  };

  return (
    <>
      <div className="pt-48 sm:mt-48 sm:pt-0">
        <h1 className="w-min text-5xl font-bold mx-auto">LOGO</h1>
      </div>
      <div className="w-8/12 mx-auto mt-6">
        <form onSubmit={submitFormHandler} className="flex flex-col gap-3">
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
            value={passwordState.value}
            type="password"
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Password"
            onChange={passwordInputHandler}
          />
          <div className="w-full flex flex-row justify-between">
            <Link href="/signup" className="hover:cursor-pointer">
              Back to Sign Up
            </Link>
            <Link className="hover:cursor-pointer" href="/forgotpassword">
              forgot password
            </Link>
          </div>
          <Button
            type="default"
            className={
              formIsValid
                ? 'w-full h-10 border-none rounded-lg text-white text-center text-sm bg-slate-900'
                : 'w-full h-10 border-none rounded-lg text-white text-center text-sm bg-slate-400 cursor-not-allowed'
            }
            disabled={!formIsValid}
          >
            Sign in
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
          <Link
            href="https://circle7.codes/api/v1/users/auth/google"
            className="w-full h-10 flex justify-center items-center border-none rounded-lg text-white text-sm bg-slate-900"
          >
            Sign in with Google
          </Link>
          <Link
            href="https://circle7.codes/api/v1/users/auth/github"
            className="w-full h-10 flex justify-center items-center border-none rounded-lg text-white text-sm bg-slate-900"
          >
            Sign in with GitHub
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
