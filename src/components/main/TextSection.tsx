import styled from "styled-components";

interface TextSectionProps {
  userName?: string;
  text?: string;
}

export default function TextSection({ userName, text }: TextSectionProps) {
  return (
    <SectionWrapper>
      <ProfileContainer>
        <ProfileImgBox src="bg-img.jpg" />
        <ProfileName>
          {userName ? userName : "username"}
          <Text>
            {text
              ? text
              : "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."}
          </Text>
        </ProfileName>
      </ProfileContainer>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
`;

const ProfileImgBox = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 90%;
  overflow: clip;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const ProfileName = styled.div`
  padding: 5px;
  font-weight: 400;
`;

const Text = styled.div`
  font-weight: 200;
`;
