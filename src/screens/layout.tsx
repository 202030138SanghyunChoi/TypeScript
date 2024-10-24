import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

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
    // border도 하얀색으로 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </MenuItem>
        </Link>
        <BottomMenu>
          <MenuItem>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
              />
            </svg>
          </MenuItem>
        </BottomMenu>
      </Navigator>
      {/* Outlet 으로 children 가져오기 ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? */}
      <Outlet />
    </Container>
  );
};
