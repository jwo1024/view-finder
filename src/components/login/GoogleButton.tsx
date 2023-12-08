import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/router";
import { Button } from "../common/common-components";

export default function GoogleButton() {
  const router = useRouter();

  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={onClick}>Sign up with Google</Button>;
}
