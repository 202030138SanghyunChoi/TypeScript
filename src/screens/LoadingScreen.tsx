import styled, { keyframes } from "styled-components";

// css(높이 전체, 배경색 지정, flex 레이아웃, 가운데 정렬(x, y)
const Container = styled.div`
  height: 100vh;
  background-color: springgreen;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// animation - transition(시작, 끝, 속도)
const BounceAnim = keyframes`
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.5);
    }
    100%{
        transform: scale(1);
    }
`;

// dot
const Dot = styled.div`
  background-color: white;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0px 5px;
  // transition animation 사용
  animation: ${BounceAnim} 1s infinite ease-in-out;
  // Dot 들 사이의 n번째 요소
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.25s;
  }
  &:nth-child(3) {
    animation-delay: 0.5s;
  }
`;

export default () => {
  return (
    <Container>
      <Dot />
      <Dot />
      <Dot />
    </Container>
  );
};
