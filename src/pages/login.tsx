import styled from "styled-components";
import LoginForm from "../components/LoginForm/LoginForm";

export default function Login() {
  return (
    <LoginLayout>
      <BluredBackground />
      {/* <LoginContainer> */}
        <LoginForm />
      {/* </LoginContainer> */}
    </LoginLayout>
  );
}

const LoginLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.main`
  background-color: #000;
  opacity: 0.7;
  color: #fff;

  margin: 10%;
  width: 60%;
  height: 60%;
  min-width: 500px;
  min-height: 400px;

  border-radius: 10px;
  padding: 1rem;
`;

const BluredBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: black; */
  background-image: url("bg-img.jpg");
  background-size: cover;
  filter: blur(10px); /* blur 효과 적용 */
  z-index: -1; /* 뒤에 위치하도록 설정 */
`;
