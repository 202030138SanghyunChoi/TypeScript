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
            <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clip-rule="evenodd"/>
            </svg>
          </MenuItem>
        </Link>
        <BottomMenu>
          <MenuItem>
            <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                    d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z"
                    clip-rule="evenodd"/>
            </svg>
          </MenuItem>
        </BottomMenu>
      </Navigator>
      {/* 부모 라우터에 정의되어 있는 자식 라우터 렌더링. path: "/" 가 부모 라우터, 거기에 정의 되어 있는 라우터는 children */}
      <Outlet/>
    </Container>
  );
};
