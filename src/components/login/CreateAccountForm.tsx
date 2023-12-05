import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import loginPersistence from "../../firebase/login";
import { FirebaseError } from "firebase/app";

export default function CreateAccountForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    if (isLoading || name === "" || email === "" || password === "") {
      // setError("Please fill out all fields");
      return;
    }
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: name }).then(() => {
        // loginPersistence(email, password);
      });
      await loginPersistence(email, password);
      // navigate("/");
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
      // console.log(error.code, error.message);
    } finally {
      setLoading(false);
    }

    console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading ..." : "create account"}
        />
      </Form>
      {error !== "" && <Error>{error}</Error>}
    </Wrapper>
  );
}

const Error = styled.span`
  color: red;
  font-weight: 400;
  margin: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  /* width: 100%; */
  height: 2rem;
  margin: 0.5rem 0;

  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #fff;
  color: #000;
  &:focus {
    outline: none;
  }
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;
