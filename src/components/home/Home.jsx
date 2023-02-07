import { useState } from 'react';
import Login from './login';
import SignUp from './signUp';

function Home() {
  const [loginDislay, setLoginDisplay] = useState(true);
  const [signupDislay, setSignupDisplay] = useState(null);

  const loginPageHandler = () => {
    setLoginDisplay(true);
    setSignupDisplay(false);
  };
  const signupPageHandler = () => {
    setLoginDisplay(false);
    setSignupDisplay(true);
  };

  let content;

  if (signupDislay)
    content = (
      <div className="ml-2 relative top-72">
        <h2 className="uppercase text-5xl font-bold text-slate-100">Get</h2>
        <br />
        <h2 className="uppercase text-5xl font-bold text-slate-100">Started</h2>
      </div>
    );
  else if (loginDislay)
    content = (
      <div className="ml-2 relative top-64">
        <h2 className="text-5xl font-bold text-slate-100">Hello</h2>
        <br />
        <h2 className="text-5xl font-bold text-slate-100">Welcome</h2>
        <br />
        <h2 className="text-5xl font-bold text-slate-100">Back !</h2>
      </div>
    );

  return (
    <>
      <section className="min-w-full min-h-screen grid grid-cols-5">
        <div className="min-w-full h-screen bg-slate-200 col-span-3">
          {signupDislay && <SignUp onClick={loginPageHandler} />}
          {loginDislay && <Login onClick={signupPageHandler} />}
        </div>
        <div className="min-w-full h-screen bg-slate-800 col-span-2">
          {content}
        </div>
      </section>
    </>
  );
}
export default Home;
