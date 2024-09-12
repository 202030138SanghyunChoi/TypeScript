import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./screens/home";
import Profile from "./screens/profile";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
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
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
    // className??????????????????????????????
    <Container className="App">
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </Container>
  );
}

export default App;

// 전역 Global CSS Style
const GlobalStyle = createGlobalStyle`
  // ????????????????????
  ${reset}
  body{
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
