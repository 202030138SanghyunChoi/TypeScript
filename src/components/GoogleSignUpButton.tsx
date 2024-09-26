import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: white;
  color: black;
  padding: 5px 20px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const Title = styled.p``;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

export default () => {
  // Hook은 default가 되는 루트 함수에 위치
  const navigation = useNavigate();

  // Google 로그인 함수(await를 위해 async 함수 설정)
  const onClick = async () => {
    try {
      // provider 생성(Google 로그인 제공자)
      const provider = new GoogleAuthProvider();
      // Firebase에게 provider & 로그인 정보 전송
      await signInWithPopup(auth, provider);
      // 로그인에 성공하고 홈페이지로 이동
      navigation("/");
    } catch (e) {
      // Firebase 에러
      if (e instanceof FirebaseError) {
        alert(e.message);
      }
    }
  };

  return (
    <Button onClick={onClick}>
      <Icon src={`${process.env.PUBLIC_URL}/google-icon.png`} />
      <Title>구글 계정으로 로그인하기</Title>
    </Button>
  );
};
