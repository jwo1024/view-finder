import styled from "styled-components";
import { useState } from "react";
import { set } from "firebase/database";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostForm() {
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length === 1) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || text === "" || text.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "posts"), {
        text,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      const maxFileSize = 10 << 20;// 10MB
      if (file && file.size < maxFileSize) {
        const locationRef = ref(
          storage,
          `posts/${user.uid}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, { photo: url });
      }
      setText("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }

    setLoading(true);
    // const attachment = file ? await uploadFile(file) : null;
    // await createPost({ text, attachment });
    setLoading(false);
    setText("");
    setFile(null);
  };

  return (
    <Layout>
      <Form onSubmit={onSubmit}>
        Share your magical moments !
        <Textarea
          rows={5}
          maxLength={180}
          onChange={onChange}
          value={text}
          placeholder="Share your magical moments with others as captured by View Finder!"
        />
        <AttachPhotoButton htmlFor="file">
          {file ? "Photo Added ✔︎" : "Add Photo"}
        </AttachPhotoButton>
        <AttachFileInput
          onChange={onFileChange}
          type="file"
          id="file"
          accept="image/*"
        />
        {/*  accpet ?  */}
        <SubmitButton type="submit">
          {isLoading ? "Posting..." : "Post Photo"}
        </SubmitButton>
      </Form>
    </Layout>
  );
}

const Textarea = styled.textarea`
  /* flex: 0 1 auto; */
  display: relative;
  width: 90%;

  background-color: #000000;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 16px;
  font-weight: 100;
  color: #fff;
  resize: none;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border: 3px solid #ffffffbf;
  }
`;

const AttachPhotoButton = styled.label`
  width: 90%;
  text-align: center;

  background-color: #00000079;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: large;
  font-weight: 300;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  /* width: 100%; */

  background-color: #00000079;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: large;
  font-weight: 300;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 32px;
  border-radius: 0.1rem;
  font-size: x-large;
  font-weight: 200;
  align-items: center;
  width: 100%;
  max-width: 100%;
  /* overflow: hidden; */
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  position: absolute;
  top: 10%;
  left: 21%;
  width: 60%;
  height: 80%;
  color: #fff;
  background-color: #151515e4;
  border-radius: 1%;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`;
