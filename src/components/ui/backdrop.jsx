import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function BgLayer() {
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-10 bg-black"></div>
  );
}

function Backdrop(props) {
  const [isDisplay, setIsDisplay] = useState(null);

  useEffect(() => {
    setIsDisplay(true);

    return () => setIsDisplay(null);
  }, [props.display]);

  const content = createPortal(
    <BgLayer />,
    document.getElementById('backdrop')
  );

  return <>{isDisplay && content}</>;
}

export default Backdrop;
