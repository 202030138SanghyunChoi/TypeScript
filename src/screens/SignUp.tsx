import { useState } from "react";
import styled from "styled-components";

// ?????????????????????????????????
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

export default () => {
  // default로 export하느 컴포넌트 안에서 return 하기 전에 로직 작성

  // 회원 정보 저장(State - 값이 변경되는 변수 / stateHook 사용)
  // 리턴값을 배열형태로 두개를 받아옴. 변수(저장할데이터값), set변수(값을 변경할 함수)
  const [nickName, setNickName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  // 회원 가입 버튼 클릭 시 입력한 폼의 정보를 전송(Validate 포함)
  // 중복 계정 및 에러 사항 처리
  // 로딩 처리
  const onSubmit = () => {};

  return (
    <Container>
      <Title>회원 가입</Title>
      <Form>
        <SubTitle>이름</SubTitle>
        {/* onChange 생략 과정 */}
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
        <Input type="submit" value="회원 가입" />
      </Form>
    </Container>
  );
};
