import styled from "styled-components";

export default function LoginForm() {
  return (
    <Layout>
      <TextLabel>Wellcome</TextLabel>
      <TextLabel>to</TextLabel>
      <TextLabel>View Finder</TextLabel>
      <br></br>
      <ButtonLayout>
        <Button> Sign up with Google </Button>
        ------------------------ or ------------------------
        <Button> Login </Button>
      </ButtonLayout>
    </Layout>
  );
}

const TextLabel = styled.section`
  font-size: 3rem;
  font-weight: 300;
  margin: 0.5rem;
  text-align: left;
  line-height: 0.8;
`;

const Button = styled.button`
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const Layout = styled.div`
  background-color: #000;
  opacity: 0.7;
  color: #fff;

  margin: 10%;
  padding: 4rem 2rem;
  width: 60%;
  height: 60%;
  min-width: 400px;
  min-height: 500px;

  border-radius: 10px;
`;
