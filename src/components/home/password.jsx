import Button from '@ui/button';
import Input from '@ui/input';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useValidation from '@hooks/use-Validation';

function Password({ passwordReset }) {
  const [formIsValid, setFormIsValid] = useState(null);
  const email = useValidation(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const { inputState: emailState, dispatchInput: dispatchEmail } = email;

  useEffect(() => {
    if (emailState.isValid) setFormIsValid(true);
    else {setFormIsValid(false)}
  }, [emailState.isValid]);

  const emailInputHandler = (e) => {
    dispatchEmail({ type: 'EMAIL_INPUT', val: e.target.value });
  };

  const submitResetHandler = (e) => {
    e.preventDefault();
    // FROM CUSTOM HOOK
    passwordReset.postRequest({ email: emailState.value });
    dispatchEmail({ type: 'EMAIL_INPUT', val: '' });
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="w-4/5 h-2/3 shadow-md rounded-xl flex flex-col justify-center items-center sm:max-w-xl">
        <form onSubmit={submitResetHandler} className="w-4/5 flex flex-col">
          <h1 className="text-2xl font-medium text-slate-800">
            Did you forget your password?
          </h1>
          <p className="text-slate-400 mt-1 mb-9">
            Enter you email address below
          </p>
          <label htmlFor="email">Email Address</label>
          <Input
            type="email"
            className="border w-full h-10 rounded-md pl-2"
            id="email"
            value={emailState.value}
            placeholder="johndoe@example.com"
            onChange={emailInputHandler}
          />
          <Button
            type="default"
            className={
              formIsValid
                ? 'w-full mt-4 h-10 border-none rounded-lg text-white text-center text-sm bg-slate-900'
                : 'w-full mt-4 h-10 border-none rounded-lg text-white text-center text-sm bg-slate-400 cursor-not-allowed'
            }
          >
            Reset password
          </Button>
          <Link href="/login" className="mt-3 text-sm hover:cursor-pointer">
            Back to sign in
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Password;
