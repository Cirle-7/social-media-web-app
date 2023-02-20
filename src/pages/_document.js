import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        {/* <div id='backdrop'></div> */}
        <div id='spinner' className='flex justify-center items-center'></div>
        <NextScript />
      </body>
    </Html>
  );
}
