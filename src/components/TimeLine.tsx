import { useEffect, useState } from "react";
import styled from "styled-components";
import { IPost } from "../types/posts-type";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const Container = styled.div``;

export default () => {
  // 게시글들 다룰 State Hook. 타입스크립트를 적용하여 IPost 배열을 다룸. 초기값 빈 배열
  const [posts, setPosts] = useState<IPost[]>([]);

  // 서버에서 게시글 받아오는 함수
  const fetchPosts = async () => {
    // 경로 지정(firebase DB, posts 컬렉션)
    const path = collection(firestore, "posts");
    // 조건 지정. OrderBy 를 사용(기준 필드, 오름차순/내림차순) 내림차순(최신순)으로 받기 위해 desc
    const condition = orderBy("createdAt", "desc");
    // firebase qeury 메서드(경로와 조건 지정)로 postsQuery 에 명세서 저장
    const postsQuery = query(path, condition);
    // 명세서를 이용하여 snapshot 에 게시글들 저장(외부 소통 await)
    const snapshot = await getDocs(postsQuery);
    // snapshot d의 docs를 map 형태로 저장(콜백함수(doc를 객체 별명으로 사용한다고 생각))
    const timeLinePosts = snapshot.docs.map((doc) => {
      // doc.data() 를 통해 post 정보(createdAt, nickName 등등)
      // as 로 타입 정의
      // { } 를 이용해 필드들을 쉽게 추출
      const { post, userId, nickname, createdAt } = doc.data() as IPost;
      return {
        // key 와 value 가 같으면 생략 가능
        post: post,
        userId: userId,
        nickname: nickname,
        createdAt: createdAt,
        id: doc.id,
      };
    });

    // post 변수 값을 timeLinePosts 로 설정
    setPosts(timeLinePosts);
  };

  // Effect Hook.
  // 의존성 배열 변경시 마다 콜백함수(Parameter로 함수가 들어올 경우) 실행. 배열을 비워두면 페이지 최초 로드 시 한번만 수행
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Container>
      <hr />
      {/* map 함수를 이용하여 post의 정보 값 출력 */}
      {posts.map((post) => {
        return (
          <div>
            <h1>{"[[" + post.nickname + "]]"}</h1>
            <p>{post.post}</p>
            <hr />
          </div>
        );
      })}
    </Container>
  );
};
