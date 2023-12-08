import styled from "styled-components";

interface ImgSectionProps {
  photo?: string;
}

export default function ImgSection({ photo }: ImgSectionProps) {
  return (
    <SectionWrapper>
      <ImgWrapper src={photo ? photo : "bg-img-test.jpg"}></ImgWrapper>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background-color: white;
`;

const ImgWrapper = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: contain;
  background-color: #000000;
  border-radius: 0.1rem;
`;
