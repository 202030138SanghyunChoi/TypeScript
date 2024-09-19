import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import reset from "styled-reset";

// Page 관리 기능 - home, profile, signin, signup 기능 구현

// 라우터
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        // home 기능
        path: "",
        element: <Home />,
      },
      {
        // profile 기능
        path: "profile",
        element: <Profile />,
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
  return (
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
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
