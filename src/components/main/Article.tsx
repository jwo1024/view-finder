import styled from "styled-components";
import TextSection from "./TextSection";
import ImgSection from "./ImgSection";
import { ArticleProps } from "./TimeLine";
import { auth, db, storage } from "@/firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export default function Article({
  username,
  photo,
  text,
  createdAt,
  userId,
  id,
}: ArticleProps) {
  const user = auth.currentUser;

  const onDelete = async () => {
    if (user?.uid === userId) {
      const res = window.confirm("Are you sure you want to delete this post?");
      if (res) {
        try {
          await deleteDoc(doc(db, "posts", id));
          if (photo) {
            const photoRef = ref(storage, `posts/${user.uid}/${id}`);
            await deleteObject(photoRef);
          }
        } catch (err) {
          console.log(err);
        } finally {
          //
        }
      }
    }
  };

  const onEdit = () => {
    if (user?.uid === userId) {
      //

    }
  };

  return (
    <ArticleWrapper>
      <ImgSection photo={photo} />
      <TextSection text={text} userName={username} />
      {user?.uid === userId ? (
        <span>
          <EditButton onClick={onEdit}>Edit</EditButton>{" "}
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        </span>
      ) : null}
    </ArticleWrapper>
  );
}

const ArticleWrapper = styled.article`
  display: flex;
  background-color: #2222227a;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.3rem #333;
`;

const DeleteButton = styled.button`
  background-color: #505050;
  color: #fff;
  border: none;
  border-radius: 0.1rem;
  padding: 0.3rem;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  width: 100px;
  &:hover {
    background-color: #ff0000aa;
  }
`;

const EditButton = styled.button`
  background-color: #505050;
  color: #fff;
  border: none;
  border-radius: 0.1rem;
  padding: 0.3rem;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  width: 100px;
  &:hover {
    background-color: #ffffffaa;
  }
`;
