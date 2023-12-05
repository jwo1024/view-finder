import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { BrowserRouter } from "react-router-dom";
import Router from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setLoading] = useState(true);

  const init = async () => {
    setLoading(false);

    if (window.location.pathname !== "/login") {
      await auth.authStateReady();
      const user = auth.currentUser;
      if (user === null) Router.push("/login");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <BrowserRouter>
          <Component {...pageProps} />
        </BrowserRouter>
      )}
    </>
  );
}
