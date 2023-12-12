import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { BrowserRouter } from "react-router-dom";
import Router from "next/router";
import { styled } from "styled-components";
import { BluredBackground } from "@/components/common/common-components";
import { AsideMenu } from "@/components/common/AsideMenu";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setLoading] = useState(true);
  const [isLoginPage, setIsLoginPage] = useState(true);

  const init = async () => {
    setLoading(false);

    if (window.location.pathname !== "/login") {
      await auth.authStateReady();
      setIsLoginPage(true);
      const user = auth.currentUser;
      if (user === null) Router.push("/login");
    } else {
      setIsLoginPage(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const goHome = () => {
    Router.push("/");
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isLoginPage ? (
        <Layout>
          <BluredBackground />
          <Header>
            <Logo onClick={goHome}>ViewFinder</Logo>
          </Header>
          <Main>
            <Component {...pageProps} />
          </Main>
          <Aside>
            <AsideMenu />
          </Aside>
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  gap: 1rem;
  height: 100vh;
`;

const Header = styled.header`
  flex: 0 1 auto;
  color: #fff;
  padding: 1rem;
`;

const Logo = styled.button`
  padding: 10px;
  margin: 0px;
  /* width: 120px; */
  font-size: medium;
  font-weight: 1000;
  background-color: #ffffff;
  color: #000000;
  border-radius: 90%;
  border: 0px;
  cursor: pointer;
`;

const Main = styled.main`
  flex: 1 0 auto;
  background-image: url(bg-film.svg);
  background-size: 100%;
  color: #fff;
  padding: 1rem;
  padding-left: 8%;
  height: 100vh;
  width: 600px;
  min-width: 480px;
  overflow: auto;
`;

const Aside = styled.aside`
  flex: 0.5 1 0%;
  color: #fff;
  padding: 2rem;
  text-align: right;
`;
