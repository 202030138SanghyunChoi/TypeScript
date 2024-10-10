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
      <button onClick={signOut}>로그아웃</button>
    </Container>
  );
};
