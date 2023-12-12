import styled from "styled-components";
import { useState } from "react";
import { Button, Logo } from "@/components/common/common-components";
import { useRouter } from "next/router";
import { auth } from "@/firebase/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import {
  BluredBackground,
  Seperator,
} from "@/components/common/common-components";

export default function Login() {
  const [error, setError] = useState("");

  return (
    <Layout>
      <BluredBackground />
      <Container>
        <TextLabel>Wellcome</TextLabel>
        <TextLabel>to</TextLabel>
        <TextLabel>View Finder</TextLabel>
        <br />
        <Seperator />
        <br />
        <ButtonBox>
          <GithubButton setError={setError} />
          <GoogleButton setError={setError} />
        </ButtonBox>
        {error && <p>{error}</p>}
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

interface ILoginButton {
  setError: (error: string) => void;
}

function GithubButton({ setError }: ILoginButton) {
  const router = useRouter();

  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
      else setError("An error occurred");
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/github-mark.svg" alt="github" />
      Sign up with Github
    </Button>
  );
}

function GoogleButton({ setError }: ILoginButton) {
  const router = useRouter();

  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
      else setError("An error occurred");
    }
  };

  return <Button onClick={onClick}>Sign up with Google</Button>;
}
