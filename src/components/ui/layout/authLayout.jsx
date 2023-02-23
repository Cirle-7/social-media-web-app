import { useRouter } from 'next/router';

function AuthLayout({ children }) {
  const router = useRouter()

  let content;

  if (router.pathname === '/signup')
    content = (
      <div className="ml-2 relative top-72">
        <h2 className="uppercase text-5xl font-bold text-slate-100">Get</h2>
        <br />
        <h2 className="uppercase text-5xl font-bold text-slate-100">Started</h2>
      </div>
    );
  else if (router.pathname === '/login')
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
      <section className="sm:min-w-full sm:min-h-screen sm:grid sm:grid-cols-5">
        <div className="sm:min-w-full sm:h-screen bg-slate-50 sm:col-span-3">
          {children}
        </div>
        <div className="hidden sm:block sm:min-w-full sm:h-screen sm:bg-slate-800 sm:col-span-2">
          {content}
        </div>
      </section>
    </>
  );
}
export default AuthLayout;
