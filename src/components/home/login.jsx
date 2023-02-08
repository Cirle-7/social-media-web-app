import Button from '../ui/button';
import Input from '../ui/input';

function Login(props) {
  return (
    <>
      <div className="mt-48">
        <h1 className="w-min text-5xl font-bold mx-auto">LOGO</h1>
      </div>
      <div className="w-8/12 mx-auto mt-6">
        <form className="flex flex-col gap-3">
          <Input
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Email Address"
          />
          <Input
            className="w-full h-10 text-sm border-none px-4 bg-gray-500 rounded-lg"
            placeholder="Password"
          />
          <div className='w-full flex flex-row justify-between'>
            <p className='hover:cursor-pointer' onClick={props.onClick}>Back to Sign Up</p>
            <p>forgot credentials</p>
          </div>
          <Button className="w-full h-10 border-none rounded-lg text-white text-sm bg-slate-900">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
