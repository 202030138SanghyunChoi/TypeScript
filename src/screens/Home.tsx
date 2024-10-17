import styled from "styled-components";
import { auth } from "../firebaseConfig";

const Container = styled.div``;
const Title = styled.div``;

export default () => {
  // 로그아웃 함수
  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <Container>
      <Title>Home Page</Title>
      {/* Home 은 로그인 되어있는 상태에서만 접속 가능하게 설정했기 때문에 로그아웃 버튼(클릭시 signOut 함수 수행) */}
      <button onClick={signOut}>로그아웃</button>
    </Container>
  );
};
