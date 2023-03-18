import useValidation from '@hooks/use-Validation';
import Button from '@ui/button';
import Input from '@ui/input';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Login({ login }) {
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
    <section className="pt-[10rem] sm:mt-[10rem] sm:pt-0">
      <div className="">
        <h1 className="w-min text-5xl font-bold mx-auto">LOGO</h1>
      </div>
      <div className="w-8/12 mx-auto mt-6">
        <form onSubmit={submitFormHandler} className="flex flex-col gap-3">
          <Input
            id="email"
            type="email"
            name="email"
            value={emailState.value}
            className="w-full m-0  h-10 text-sm border-none px-4 bg-gray-500 rounded-lg "
            placeholder="Email Address"
            onChange={emailInputHandler}
          />
          <Input
            id="password"
            name="pwd"
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
      </div>
    </section>
  );
}

export default Login;
