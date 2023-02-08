import Button from '../ui/button';
import Input from '../ui/input';

function SignUp(props) {
  return (
    <>
      <div className="mt-24">
        <h1 className="w-min text-5xl font-bold mx-auto">LOGO</h1>
      </div>
      <div className="w-8/12 mx-auto mt-6">
        <form className="flex flex-col gap-3">
          <Input
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Name"
          />
          <Input
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Email Address"
          />
          <Input
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Password"
          />
          <Input
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Confirm Password"
          />

          <Button className="w-full h-10 border-none rounded-lg text-white text-sm bg-slate-900">
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
          <Button onClick={props.onClick} className="font-bold">Sign in</Button>
        </small>
      </div>
    </>
  );
}

export default SignUp;
