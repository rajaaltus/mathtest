import "../styles/globals.css";
import "../styles/math.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Script
        src="https://code.jquery.com/jquery-3.6.1.min.js"
        integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
        crossorigin="anonymous"
        type="text/javascript"
      /> */}
      <Script src="../js/jquery.min.js" type="text/javascript" />
      <Script src="../js/math-js.js" type="text/javascript" />
      <Script src="../js/rounding.js" type="text/javascript" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
