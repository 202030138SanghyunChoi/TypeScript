import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import reset from "styled-reset";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";
import LoadingScreen from "./screens/LoadingScreen";
import ProtectedRouter from "./components/ProtectedRouter";

// Page 관리 기능 - home, profile, signin, signup 기능 구현

// 라우터
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        // home 기능
        path: "",
        element: (
          // 라우팅 시 로그인 여부를 판단하는 ProtectedRouter 를 거치기
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        // profile 기능
        path: "profile",
        element: (
          // 라우팅 시 로그인 여부를 판단하는 ProtectedRouter 를 거치기
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const Container = styled.div`
  // 100vh = 화면 전체 비율
  height: 100vh;
  // 크기 지정 전까지 요소의 크기만큼만 적용
  display: flex;
  // 중앙 정렬
  justify-content: center;
`;

function App() {
  // 로딩 변수 선언
  const [loading, setLoading] = useState<boolean>(true);

  // Firebase API 로그인 여부 판단
  // 비동기 사용
  const init = async () => {
    // Firebase 로그인 여부 판단 메서드
    await auth.authStateReady();
    // 일 처리 이후 로딩 종료
    setLoading(false);
  };

  // 함수, 의존성 배열(값이 변경될 때마다 함수 호출. 생략 시 모든 state 가 변경될 때마다 수행)
  useEffect(() => {
    // 초기화라고 이름을 지었지만 일단은 Firebase API 로그인 여부만 판단
    init();
  }, []);

  // 로딩 여부 판단
  // loading 이 true 이면 LoadingScreen 을 띄우고, false 면 Container, 그냥 메인 화면 띄우기
  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </Container>
  );
}

export default App;

// 전역 Global CSS Style
const GlobalStyle = createGlobalStyle`
  // 기본 css 초기화 및 기본값 설정
  ${reset}
  body{
    background: linear-gradient(90deg, #EF3DF2, #2E338C, #1E2040); 
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
