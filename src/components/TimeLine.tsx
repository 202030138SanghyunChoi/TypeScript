import { useEffect, useState } from "react";
import styled from "styled-components";
import { IPost } from "../types/posts-type";
import {
  Unsubscribe,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
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
    const condition = orderBy("createdAt", "asc");
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
    // unsubscribe 사용으로 잠시 사용 중단
    // fetchPosts();

    // firestore 의 Unsubscribe 선언(실시간 동작이 끝나면 구독을 종료하는 함수)
    // 타입 스크립트 지정( Unsubscribe 또는 null ) - onSnapShot 전에 Undefined 되기 때문에 초기값을 위해 null 타입도 지정
    let unsubscribe: Unsubscribe | null = null;

    const fetchPostsRealTime = async () => {
      // firestore "posts" 컬렉션으로 경로 지정
      const path = collection(firestore, "posts");
      // 만들어진 날짜를 기준으로 내림차순(최신순)
      const condition = orderBy("createdAt", "asc");
      // 경로와 조건을 기준으로 쿼리생성
      const postsQuery = query(path, condition);
      // 쿼리를 넣어 onSnapshot 수행.
      // 위에 만들어 놓은 unsubscribe 값에 넣기

      // 구독 시작 시점. onSnapShot 을 통해 postsQuery 에 해당하는 쿼리에 대하여 실시간으로 문서변경사항을 감지
      // onSnapshot 은 구독을 종료하는 함수를 반환. 반환값을 unsubscribe 에 반환.(useEffect return 에서 구독 종료.)
      // 서버 통신 비동기 처리 필요
      unsubscribe = await onSnapshot(postsQuery, (snapshot) => {
        // doc 안의 값을 맵 형태로 뽑기
        const timeLinePosts = snapshot.docs.map((doc) => {
          const { createdAt, nickname, post, userId } = doc.data() as IPost;
          return {
            // key value 같으면 생략 가능(key 이름이 자동으로 value 의 이름과 동일하게 됨)
            createdAt,
            nickname,
            post,
            userId,
            id: doc.id,
          };
        });

        // post 세팅
        setPosts(timeLinePosts);
      });
    };

    fetchPostsRealTime();

    // clean-up 함수. useEffect 를 마치고 수행. 부가설정들을 관리하는 용도로 사용.(이 경우는 구독 해제)
    return () => {
      // AND 연산자 사용(왼쪽이 false 면 뒤 코드는 수행하지 않음.)
      // 구독 종료 시점.
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
      <Container>
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
