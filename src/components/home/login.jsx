import { useEffect, useState } from 'react';
import useValidation from 'src/hooks/use-Validation';
import Button from '../ui/button';
import Input from '../ui/input';

function Login(props) {
  const { signupPageHandler, login } = props.onClick;
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
            <p
              className="hover:cursor-pointer"
              onClick={() => signupPageHandler()}
            >
              Back to Sign Up
            </p>
            <p>forgot password</p>
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
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
