import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          {/* <Script
            src="https://code.jquery.com/jquery-3.6.1.min.js"
            integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
            crossorigin="anonymous"
            type="text/javascript"
          /> */}
          <Script src="../js/jquery.min.js" type="text/javascript" />
          <Script src="../js/math-js.js" type="text/javascript" />
          <Script src="../js/rounding.js" type="text/javascript" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
