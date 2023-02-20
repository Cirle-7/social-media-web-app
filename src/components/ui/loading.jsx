import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Spinner() {
  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 z-10 bg-black opacity-40"></div>
      <div className="w-3/5 h-32 max-w-lg max-h-40 fixed top-72 z-10 bg-black flex flex-col justify-center items-center rounded-lg">
        <div className="animate-spin w-16 h-16 border-4 border-l-black border-r-black rounded-full flex justify-center items-center"></div>
        <p className="text-white pt-3">Please wait...</p>
      </div>
    </>
  );
}

function LoadingAnimation({loadingSpinner}) {
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    setIsLoading(loadingSpinner);

    return () => setIsLoading(null);
  }, [loadingSpinner]);

  return (
    <>
      {isLoading &&
        createPortal(<Spinner />, document.getElementById('spinner'))}
    </>
  );
}

export default LoadingAnimation;
