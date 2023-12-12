import { styled } from "styled-components";
import { Seperator } from "@/components/common/common-components";
import Article from "@/components/main/Article";
import { ArticleProps } from ".";
import { useState, useEffect } from "react";
import { auth, storage, db } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export default function Profile() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);

  const onDelete = async () => {};
  const onAvatarChanage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (user && files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user.uid}`);
      const result = await uploadBytes(locationRef, file);

      const avatarUrl = await getDownloadURL(result.ref);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
      setAvatar(avatarUrl);
    }
  };

  const fetchArticles = async () => {
    if (!user) return;
    const articleQuery = query(
      collection(db, "posts"),

      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(articleQuery);
    const newArticles = snapshot.docs.map((doc) => {
      const { createdAt, photo, text, userId, username } = doc.data();
      return {
        id: doc.id,
        createdAt,
        photo,
        text,
        userId,
        username,
      };
    });
    setArticles(newArticles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Layout>
      <ProfileLayout>
        <AvatarLabel htmlFor="avatar">
          <ProfileImgBox src={avatar ? avatar : "bg-img.jpg"} />
        </AvatarLabel>
        <AvatarInput
          id="avatar"
          type="file"
          accept="image/*"
          onChange={onAvatarChanage}
        />
        <ProfileInnerLayout>
          <ProfileName>Name</ProfileName>
          <ProfileText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            praesentium modi natus quae?
            {/* <Button> edit </Button> */}
          </ProfileText>
        </ProfileInnerLayout>
      </ProfileLayout>
      <Seperator />
      {articles.map((post) => (
        <Article
          key={post.id}
          username={post.username}
          photo={post.photo}
          text={post.text}
          createdAt={post.createdAt}
          id={post.id}
          userId={post.userId}
        />
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  // 스크롤바 안보이게
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
`;

const ProfileLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImgBox = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 90%;
  overflow: clip;
  object-fit: cover;
`;

const ProfileInnerLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 10px;
`;

const ProfileName = styled.span`
  font-size: x-large;
  font-weight: 100;
`;

const ProfileText = styled.span`
  font-size: medium;
`;

const AvatarLabel = styled.label`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  padding: 0px;
  margin: 0px;
  &:hover {
    opacity: 0.5;
  }
`;

const AvatarInput = styled.input`
  display: none;
`;
