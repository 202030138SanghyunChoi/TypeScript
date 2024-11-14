import { useEffect, useState } from "react";
import styled from "styled-components";
import { IPost } from "../types/posts-type";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import Post from "./Post";

const Container = styled.div``;

export default () => {
  // 게시글들 다룰 State Hook. 타입스크립트를 적용하여 IPost 배열을 다룸. 초기값 빈 배열
  const [posts, setPosts] = useState<IPost[]>([]);

  // 서버에서 게시글 받아오는 함수
  const fetchPosts = async () => {
    // 경로 지정(firebase DB, posts 라는 이름의 컬렉션으로 지정)
    const path = collection(firestore, "posts");
    // 조건 지정. OrderBy 를 사용(기준 필드, 오름차순/내림차순) 내림차순(최신순)으로 받기 위해 desc
    const condition = orderBy("createdAt", "desc");
    // firebase qeury 메서드(경로와 조건 지정)로 postsQuery 에 명세서 저장
    const postsQuery = query(path, condition);
    // 명세서를 이용하여 snapshot(임시 주소 저장의 의미) 에 게시글들 저장(외부 소통 await)
    const snapshot = await getDocs(postsQuery);
    // snapshot d의 docs를 map() 수행(순회 접근)
    const timeLinePosts = snapshot.docs.map((doc) => {
      // 구조분해, 역구조화: doc.data() 를 통해 doc의 정보(createdAt, nickName 등등)를 각각의 변수에 저장
      // as 로 타입 정의
      const { post, userId, nickname, createdAt } = doc.data() as IPost;

      // 구조화: 뽑은 데이터를 IPost 타입에 필요한 데이터들을 구조체로 반환
      return {
        // key 와 value 가 같으면 생략 가능
        post,
        userId,
        nickname,
        createdAt,
        id: doc.id,
      };
    });

    // post 변수 값을 timeLinePosts(구조체 리턴) 로 설정
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
        // 함수형 컴포넌트에 Props 전달
        return (
          <Post
            // es: ... 을 통해 Spread Operator 구조체의 값을 전부 전송(전송하는 props 의 key 와 value 이름 일치 시)
            {...post}
            // userId={post.userId}
            // createdAt={post.createdAt}
            // nickname={post.nickname}
            // post={post.post}
          />
        );
      })}
    </Container>
  );
};
