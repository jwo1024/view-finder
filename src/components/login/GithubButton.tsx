import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/router";
import { Button, Logo } from "./common-components";

export default function GithubButton() {
  const router = useRouter();

  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/github-mark.svg" alt="github" />
      Sign up with Github
    </Button>
  );
}
