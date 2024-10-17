import styled, { keyframes } from "styled-components";

// css(높이 전체, 배경색 지정, flex 레이아웃, 가운데 정렬(x, y)
const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// animation 설정 (0%, 50%, 100%(끝)에서 scale 을 n배로 설정) 스타 잘하고 싶다...
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

// dot css 설정(색, 너비, 높이, 둥글게, 여백(좌우, 애니메이션, n번째 자식의 애니메이션 딜레이)
const Dot = styled.div`
  background-color: white;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0px 5px;
  // transition animation 사용(1s: 1초에 거쳐 애니메이션, infinite: 영원히 반복. ease-in-out: 천천히-보통-천천히)
  // ease: 천천-빠름-천천, ease-in: 보통-빠르게, ease-out: 보통-느리게
  animation: ${BounceAnim} 1s infinite ease-in-out;
  // Dot 들 사이의 n번째 요소에서의 애니메이션 딜레이
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
