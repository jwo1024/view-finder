import styled from "styled-components";
import Article from "./Article";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { Unsubscribe } from "@firebase/util";

export interface ArticleProps {
  id: string;
  photo?: string;
  text: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function TimeLine() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  const fetchArticle = async () => {
    const articleQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    let unsubcribe = await onSnapshot(articleQuery, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
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
      setArticles(posts);
    });
    return unsubcribe;
  };

  useEffect(() => {
    let unsubcribe: Unsubscribe | null = null;
    fetchArticle()
      .then((res) => {
        unsubcribe = res;
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      unsubcribe && unsubcribe();
    };
  }, []);

  return (
    <Layout>
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
