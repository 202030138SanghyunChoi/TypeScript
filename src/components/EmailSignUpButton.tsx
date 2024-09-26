import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #ff8aff;
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

  // 회원 가입 페이지로 이동하는 함수
  const onClick = () => {
    navigation("/signup");
  };

  return (
    <Button onClick={onClick}>
      <Icon src={`${process.env.PUBLIC_URL}/email-icon.png`} />
      <Title>이메일로 가입하기</Title>
    </Button>
  );
};
