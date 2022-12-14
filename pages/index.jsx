import Head from "next/head";
import styles from "../styles/Home.module.css";
import useMath from "../utils/useMath";

export default function Home() {
  const {} = useMath();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="text-center">
          <form>
            <div className="row">
              <div className="col">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <input
                    type="button"
                    className="btn btn-info"
                    value="Previous"
                    id="btnPrev"
                  />
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="New"
                    id="btnRenderSteps"
                  />
                  <input
                    type="button"
                    className="btn btn-info"
                    value="Next"
                    id="btnNext"
                  />
                </div>
              </div>
            </div>
            <div className="form-group"></div>
          </form>
        </div>
        <div id="container">
          <div id="result"></div>
          <div id="steps"></div>
          <div id="sum"></div>
        </div>
      </main>
    </div>
  );
}
