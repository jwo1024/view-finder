import styled from "styled-components";
import { useRouter } from "next/router";
import { BluredBackground } from "@/components/common/common-components";
import TimeLine from "@/components/main/TimeLine";
import { AsideContainer } from "@/components/main/AsideContainer";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Layout>
        <BluredBackground />
        <Header>
          <Logo>ViewFinder</Logo>
        </Header>
        <Main>
          <TimeLine />
        </Main>
        <Aside>
          <AsideContainer />
        </Aside>
      </Layout>
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

const Logo = styled.div`
  padding: 10px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 90%;
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
