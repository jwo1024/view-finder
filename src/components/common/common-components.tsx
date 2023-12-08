import { ReactNode } from "react";
import styled from "styled-components";

interface BluredBackgroundProps {
  backgroundImage?: string;
}

const BluredBackground = styled.div<BluredBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${(props) =>
    props.backgroundImage ? `url(${props.backgroundImage})` : 'url("bg-img.jpg")'};
  background-size: cover;
  filter: blur(10px); /* blur 효과 적용 */
  z-index: -1; /* 뒤에 위치하도록 설정 */
`;

const Logo = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  display: inline;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 0.5rem;
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

const Seperator = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const HrWrapper = styled.hr`
  width: 100%;
  border: none;
  border-top: 0.5px solid #767676;
  display: inline;
`;

const SeperatorBox = ({ ...props }) => {
  return (
    <Seperator>
      <HrWrapper />
      {props.children ? (
        <span style={{ margin: "0 0.5rem" }}>{props.children}</span>
      ) : null}
      <HrWrapper />
    </Seperator>
  );
};

export { BluredBackground, Button, Logo, SeperatorBox };
