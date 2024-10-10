import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

type Props = { children: React.ReactNode };

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
