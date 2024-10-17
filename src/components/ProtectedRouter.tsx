import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

type Props = { children: React.ReactNode };

// 로그인 할 때 이미 로그인 검증을 했지만 비정상적 루트로 컴포넌트에 접근하는 것을 막기 위해 로그인 검증 여부를 판단하는 컴포넌트
export default ({ children }: Props) => {
  // 유저 정보 변수 선언
  const user = auth.currentUser;

  // 유저 정보 있을 경우
  if (user) {
    // 컴포넌트의 children 컴포넌트를 그대로 출력
    return <>{children}</>;
    // 정보가 없을 경우
  } else {
    return <Navigate to={"/signin"} />;
  }
};
