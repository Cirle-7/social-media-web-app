import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function MessageBox({children}) {
  return (
    <div className="w-content h-9 fixed bottom-24 rounded-full px-8 py-1 text-slate-300 bg-black opacity-80">{children}</div>
  );
}

function StatusMessage({ isError, children }) {
  const [isDisplay, setIsDisplay] = useState(null);

  useEffect(() => {
    setIsDisplay(isError);

    return () => setIsDisplay(null);
  }, [isError]);

  return (
    <>
      {isDisplay &&
        createPortal(<MessageBox>{children}</MessageBox>, document.getElementById('statusMessage'))}
    </>
  );
}

export default StatusMessage;
