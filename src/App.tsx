import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Signin from "./screens/SignIn";
import Signup from "./screens/SignUp";

// Page 관리 기능 - home, profile, signin, signup 기능 구현

// 라우터
const router = createBrowserRouter([{
  path: "/",
  children: [{
    // home 기능
    path: "",
    element: <Home/>
  }, {
    // profile 기능
    path: "profile",
    element: <Profile/>
  }]
}, {
  path: "/signin",
  element: <Signin/>
}, {
  path: "/signup",
  element: <Signup/>
}]);

const Container = styled.div`
  background-color: #ff00bf;
  height: 300px;
  width: 600px;
`;
const Title = styled.div``;

function App() {
  return (
    <Container className="App">
      <RouterProvider router={router}></RouterProvider>
    </Container>
  );
}

export default App;