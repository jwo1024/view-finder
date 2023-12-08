import { styled } from "styled-components";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/router";
import PostForm from "./PostForm";
import { useState } from "react";
import { set } from "firebase/database";

export const AsideContainer = () => {
  const router = useRouter();
  const [postForm, setPostForm] = useState(false);

  const logOut = async () => {
    if (confirm("로그아웃 하시겠습니까?\nAre you sure you want to log out?")) {
      await auth.signOut();
      router.push("/login");
    }
  };

  const postArticle = () => {
    setPostForm((prev) => !prev);
  };

  return (
    <Layout>
      {postForm && <PostForm />}
      <Button onClick={logOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            // fill-rule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
            // clip-rule="evenodd"
          />
        </svg>
      </Button>
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            // fill-rule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            // clip-rule="evenodd"
          />
        </svg>
      </Button>
      <Button onClick={postArticle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>
      </Button>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  color: black;
  align-items: self-end;
`;

const Button = styled.button`
  /* flex: 1 0 auto; */
  background-color: #f0f8ffa0;
  color: #000000a0;
  border: 0px;
  /* border: 1px solid black; */
  border-radius: 5px;
  padding: 8px;
  margin: 5px;
  width: 52px;
  height: 52px;
  border-radius: 90%;
  cursor: pointer;
  &:hover {
    background-color: #00000073;
    color: aliceblue;
  }

  &:active {
    background-color: #00000073;
    color: aliceblue;
  }
`;
