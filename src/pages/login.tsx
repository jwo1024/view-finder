import styled from "styled-components";
import GithubButton from "@/components/login/GithubButton";
import GoogleButton from "@/components/login/GoogleButton";

import {
  BluredBackground,
  SeperatorBox,
} from "@/components/common/common-components";

export default function Login() {
  return (
    <Layout>
      <BluredBackground />
      <Container>
        <TextLabel>Wellcome</TextLabel>
        <TextLabel>to</TextLabel>
        <TextLabel>View Finder</TextLabel>
        <br />
        <SeperatorBox />
        <br />
        <ButtonBox>
          <GithubButton />
          <GoogleButton />
        </ButtonBox>
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextLabel = styled.section`
  font-size: 3rem;
  font-weight: 300;
  margin: 0.5rem;
  text-align: left;
  line-height: 0.8;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const Container = styled.div`
  background-color: #000;
  opacity: 0.7;
  color: #fff;

  margin: 10%;
  padding: 3rem 2rem;
  width: 30%;
  height: 60%;
  min-width: 400px;
  min-height: 400px;

  border-radius: 10px;
`;
