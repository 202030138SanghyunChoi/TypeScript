import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  // 세로 정렬
  flex-direction: column;
  // 요소들 가운데 배치
  align-items: center;
  width: 80%;
  
  // 반응형 웹 최대 크기
  max-width: 1600px;
  padding: 30px;
  background-color: red;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

// 로고 이미지

// 회원 가입 폼
const Form = styled.form`
  display: flex;
  // 안에서 요소들끼리 간격
  gap: 10px;
  flex-direction: column;
  margin-top: 30px;
  background-color: orange;
  padding-top: 5px;
  padding-bottom: 5px;
`;

// Text 입력 칸
const Input = styled.input`
  border-radius: 7px;
  border: none;
  // 상하, 좌우
  padding: 5px 8px;
  // 속성의 스타일 변경
  &::placeholder {
    font-size: 10px;
  }
  // 속성의 조건부 스타일 변경
  &[type="submit"] {
    margin-top: 20px;
    // 클릭 느낌 나게
    cursor: pointer;
  }
`;

// 안내말
const SubTitle = styled.p`
  font-size: 12px;
`;

// 회원가입 버튼
const SignUpButton = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: green;
  font-size: 15px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
`;

// 에러 메시지
const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0px;
  color: red;
  font-size: 12px;
  font-weight: bold;
  overflow-y: hidden;
`;

export default () => {
  // default로 export하는 컴포넌트 안에서 return 하기 전에 로직 작성

  // 페이지 이동 Hook 생성
  const navi = useNavigate();

  // 회원 정보 저장(State - 값이 변경되는 변수 / stateHook 사용)
  // 리턴값을 배열형태로 두개를 받아옴. 변수(저장할데이터값), set변수(값을 변경할 함수)
  const [nickName, setNickName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // 로딩 여부 변수
  const [loading, setLoading] = useState<boolean>(false);
  // 에러 메시지 변수
  const [error, setError] = useState<string>("");

  // 회원 정보 가공 및 수정(OnChange 사용)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값 위치
    // event가 가지고 있는 값 추출(그 안에 있는 값을 뽑을때는 :{} 사용)
    // 각각의 input에 onChange마다 값이 들어오기 때문에 name에 맞는 value 할당
    const {
      target: { name, value },
    } = event;

    switch (name) {
      case "nickName":
        setNickName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  // 비동기 처리를 위해 함수에 async 적용
  const onSubmit = async () => {
    // 입력값 확인
    if (nickName === "" || email === "" || password === "") {
      alert("회원 정보를 모두 입력하십시오.");
      return false;
    }

    try {
      // 정상 작동
      // 로딩 시작
      setLoading(true);
      // 유저 CREATE 메서드(인증방법, 아이디, 비밀번호)
      // 비동기 처리 - await
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 유저 이름 설정
      updateProfile(credential.user, {
        displayName: nickName,
      });

      // 페이지 이동
      navi("/");
    } catch (error) {
      // 예외 처리
      // FireBase 관련 에러 처리(Type이 FirebaseError로 판단)
      if (error instanceof FirebaseError) {
        // 에러 '코드'로 에러 변수 설정
        setError(error.code);
      }
    } finally {
      // 항상 수행
      // 로딩 종료
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>회원 가입</Title>
      <Form>
        <SubTitle>이름</SubTitle>
        {/* onChange 함수 사용 */}
        <Input
          type="text"
          name="nickName"
          onChange={onChange}
          value={nickName}
        />
        <SubTitle>이메일</SubTitle>
        <Input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={onChange}
          value={email}
        />
        <SubTitle>비밀번호</SubTitle>
        <Input
          type="password"
          name="password"
          placeholder="6자리 이상 입력"
          onChange={onChange}
          value={password}
        />
        {/* onSubmit 함수 사용 */}
        {/* loading 적용 */}
        <SignUpButton onClick={loading ? undefined : onSubmit}>
          {loading ? "회원가입 중.." : "가입하기"}
        </SignUpButton>
        <ErrorMessage>{errorMessageGroup[error]}</ErrorMessage>
      </Form>
    </Container>
  );
};

// 에러메시지 유형 타입 스크립트 적용
// 타입 인터페이스 정의(string 타입으로 타입 범주 넓히기)
interface errorMsgGroupType {
  [key: string]: string;
}
// 인터페이스 구현
const errorMessageGroup: errorMsgGroupType = {
  "auth/email-already-in-use": "이미 존재하는 계정입니다.",
  "auth/weak-password": "비밀번호는 6자리 이상 입력해주시기 바랍니다.",
  "auth/invaild-email": "잘못된 이메일 혹은 잘못된 비밀번호입니다.",
};
