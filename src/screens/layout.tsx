import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseConfig";

const Container = styled.div`
  display: grid;
  // 그리드 template 비율 설정 1:5
  grid-template-columns: 1fr 5fr;
  gap: 80px;
  width: 100%;
`;

const Navigator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
`;

const MenuItem = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  // svg 자식 css 설정
  svg {
    width: 40px;
    height: 40px;
    fill: white;
  }
`;

const BottomMenu = styled.div`
  display: flex;
  // 아래 세로 정렬
  flex-direction: column-reverse;
  align-items: center;
  // 나머지 영역에서 차지 비율
  flex: 1;
`;

export default () => {
  const navi = useNavigate();

  const signOut = async () => {
    // 로그아웃 확인
    const result = window.confirm("로그아웃 하시겠습니까?");

    if (result) {
      // auth 객체 로그 아웃하기
      await auth.signOut();

      navi("/signin");
    }
  };

  return (
    <Container>
      <Navigator>
        <Link to={"/"}>
          <MenuItem>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                clip-rule="evenodd"
              />
            </svg>
          </MenuItem>
        </Link>
        <Link to={"/profile"}>
          <MenuItem>
            <svg
              className="w-[48px] h-[48px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                clip-rule="evenodd"
              />
            </svg>
          </MenuItem>
        </Link>
        <BottomMenu>
          <MenuItem onClick={signOut}>
            <svg
              fill="#ffffff"
              height="200px"
              width="200px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 489.9 489.9"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M468.3,255.8c0.1-0.1,0.1-0.1,0.2-0.2c0.3-0.4,0.6-0.7,0.8-1.1c0.1-0.1,0.1-0.2,0.2-0.3c0.2-0.4,0.5-0.8,0.7-1.2 c0-0.1,0.1-0.2,0.1-0.2c0.2-0.4,0.4-0.8,0.6-1.3c0-0.1,0-0.1,0.1-0.2c0.2-0.4,0.3-0.9,0.5-1.4c0-0.1,0-0.2,0.1-0.2 c0.1-0.5,0.3-0.9,0.3-1.4c0-0.2,0-0.3,0.1-0.5c0.1-0.4,0.1-0.8,0.2-1.2c0.1-0.6,0.1-1.1,0.1-1.7c0-0.6,0-1.1-0.1-1.7 c0-0.4-0.1-0.8-0.2-1.2c0-0.2,0-0.3-0.1-0.5c-0.1-0.5-0.2-0.9-0.3-1.4c0-0.1,0-0.2-0.1-0.2c-0.1-0.5-0.3-0.9-0.5-1.4 c0-0.1,0-0.1-0.1-0.2c-0.2-0.4-0.4-0.9-0.6-1.3c0-0.1-0.1-0.2-0.1-0.2c-0.2-0.4-0.4-0.8-0.7-1.2c-0.1-0.1-0.1-0.2-0.2-0.3 c-0.3-0.4-0.5-0.8-0.8-1.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.4-0.4-0.7-0.9-1.2-1.3l-98.9-98.8c-6.7-6.7-17.6-6.7-24.3,0 c-6.7,6.7-6.7,17.6,0,24.3l69.6,69.6H136.8c-9.5,0-17.2,7.7-17.2,17.1c0,9.5,7.7,17.2,17.2,17.2h276.8l-69.1,69.1 c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5l98.3-98.3C467.5,256.6,467.9,256.2,468.3,255.8z"></path>{" "}
                      <path d="M110.7,34.3h128c9.5,0,17.2-7.7,17.2-17.1c0-9.5-7.7-17.2-17.2-17.2h-128C59.4,0,17.6,41.8,17.6,93.1v303.7 c0,51.3,41.8,93.1,93.1,93.1h125.9c9.5,0,17.2-7.7,17.2-17.1c0-9.5-7.7-17.2-17.2-17.2H110.7c-32.4,0-58.8-26.4-58.8-58.8V93.1 C52,60.6,78.3,34.3,110.7,34.3z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                  <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                  <g> </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </MenuItem>
        </BottomMenu>
      </Navigator>
      {/* 부모 라우터에 정의되어 있는 자식 라우터 렌더링. path: "/" 가 부모 라우터, 거기에 정의 되어 있는 라우터는 children */}
      {/* 결과적으로 Navigator 는 계속 옆에 있고 이 Outlet만 바뀌어서 라우팅됨 */}
      <Outlet />
    </Container>
  );
};
