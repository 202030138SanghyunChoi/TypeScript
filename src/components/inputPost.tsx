import { useRef, useState } from "react";
import styled from "styled-components";
import { auth, firestore } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const Form = styled.form`
  display: flex;
  padding: 20px;
  gap: 10px;
  border-radius: 20px;
  // 배경 30% 투명하게(아니 이렇게 쉬운 방법이?)
  background-color: rgba(255, 255, 255, 0.3);
`;
const ProfileArea = styled.div`
  width: 50px;
  height: 50px;
  animation: rotate 1s linear infinite;
  transform-origin: 50% 50%;
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PostArea = styled.div`
  // 컨텐츠 차지 영역을 제외하고 남은 영역 차지 비율 1 == 영역 전체 차지
  flex: 1;
`;

const TextArea = styled.textarea`
  /* text area 크기 조절 못하게 */
  height: 22px;
  resize: none;
  background-color: black;
  color: white;
  width: 100%;
  // 글꼴 설정(시스템에서 사용중인 거로)
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  /* 컴포넌트 선택 시 */
  &:focus {
    // 테두리 꼴도 보기 싫음
    outline: none;
  }
`;
const BottomMenu = styled.div`
  // htmlFor 로 연결 시킬 것이기 때문에 보이지 않게
  display: flex;
  // 영역 전체 차지하고 아이템 간 거리 동일하게
  justify-content: space-between;
  margin-top: 15px;
`;
const AttachPhotoButton = styled.label`
  padding: 5px 10px;
  background-color: rgba(14, 58, 234, 0.3);
  color: black;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  /* 마우스 올릴 때 */
  cursor: pointer;

  &:hover {
    // 0.8 투명도
    opacity: 0.8;
  }
`;
const AttachPhotoInput = styled.input`
  display: none;
`;
const SubmitButton = styled.input`
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 12px;
  /* 마우스 올릴 때 */
  cursor: pointer;
  &:hover {
    // 0.8 투명도
    opacity: 0.8;
  }
`;

export default () => {
  // 값이 undefined 되는 것을 막기 위해 초기값을 null 로 설정
  // HTML 요소 연결하는 useRef 훅. ref 속성으로 HTML 과 연결
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // 텍스트 저장 State Hook. string 타입 설정(타입스크립트)
  const [post, setPost] = useState<string>("");
  // 업로드 파일 저장 State Hook. File 타입 설정(타입스크립트)
  const [file, setFile] = useState<File>();
  // 로딩 State Hook.
  const [loading, setLoading] = useState<boolean>(false);

  // text 변경 시 text 변수에 저장
  // 타입스크립트 때문에 아래에서 arguments e의 타입 밑에서 받아올 e와 같은 타입으로 명시
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);

    // useRef 를 통해 textArea 높이 조절
    // textAreaRef 가 존재하고, current(textArea 의 모든 값이 담김)가 존재할 경우에만 수행
    if (textAreaRef && textAreaRef.current) {
      // textarea 태그의 높이를 auto로 설정(초기화 기능 포함)
      textAreaRef.current.style.height = "auto";
      // textarea 의 높이를 scroll 높이로 설정. scrollHeight 가 숫자이기 때문에 문자열 변경을 위해 ` 사용
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  // 업로드 파일 변경 시 file 변수에 저장
  // 타입스크립트 때문에 아래에서 arguments e의 타입 밑에서 받아올 e와 같은 타입으로 명시
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // value 아닌 files(List)로 가져옴
    const inputFileList = e.target.files;
    // 파일이 존재하는 지 && 개수가 1개인지 판별. AND 연산자로 인해서 inputFile 이 없으면 뒤에 코드가 실행이 안됨
    if (inputFileList && inputFileList.length === 1) {
      setFile(inputFileList[0]);
    }
  };
  // 제출
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Form 제출 시 redirect 방지
    e.preventDefault();

    // 로딩 시작
    setLoading(true);

    // 비동기 동작 시에는 try catch
    try {
      // 제출하는 유저 정보 설정
      const user = auth.currentUser;

      // 로그인은 안했거나(null) 텍스트를 안썼거나(post == null) 로딩이 true면
      if (user == null || post == null || loading) {
        // 함수 탈출
        return;
      }

      // Firebase 제출 데이터 정리(toJson)
      const myPost = {
        // user 닉네임
        nickname: user.displayName,
        // user ID
        userId: user.uid,
        // 제출 시각(현재 시각)
        createdAt: Date.now(),
        // Text
        post: post,
      };

      // fireBase 제출(firebaseConfig.ts 에서 설정한 firestore 로 posts 라는 컬렉션에 문서 추가
      const path = collection(firestore, "posts");
      // path 를 통해 문서 추가 메서드 (path 위치로, myPost(JSON)) 을
      await addDoc(path, myPost);

      setPost('');

      // storage 에 이미지 업로드 - 사진(firebae 요금제 관련 이슈로 잠시 주석 처리)
    } catch (e) {
      // 경고 처리
      console.warn("경고: ", e);
    } finally {
      // 로딩 끝
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <ProfileArea>
        <svg fill="#5dd2f2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#5dd2f2">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"><title>ionicons-v5_logos</title>
            <path
                d="M410.66,180.72h0q-7.67-2.62-15.45-4.88,1.29-5.25,2.38-10.56c11.7-56.9,4.05-102.74-22.06-117.83-25-14.48-66,.61-107.36,36.69q-6.1,5.34-11.95,11-3.9-3.76-8-7.36c-43.35-38.58-86.8-54.83-112.88-39.69-25,14.51-32.43,57.6-21.9,111.53q1.58,8,3.55,15.93c-6.15,1.75-12.09,3.62-17.77,5.6C48.46,198.9,16,226.73,16,255.59c0,29.82,34.84,59.72,87.77,77.85q6.44,2.19,13,4.07Q114.64,346,113,354.68c-10,53-2.2,95.07,22.75,109.49,25.77,14.89,69-.41,111.14-37.31q5-4.38,10-9.25,6.32,6.11,13,11.86c40.8,35.18,81.09,49.39,106,34.93,25.75-14.94,34.12-60.14,23.25-115.13q-1.25-6.3-2.88-12.86,4.56-1.35,8.93-2.79c55-18.27,90.83-47.81,90.83-78C496,226.62,462.5,198.61,410.66,180.72Zm-129-81.08c35.43-30.91,68.55-43.11,83.65-34.39h0c16.07,9.29,22.32,46.75,12.22,95.88q-1,4.8-2.16,9.57a487.83,487.83,0,0,0-64.18-10.16,481.27,481.27,0,0,0-40.57-50.75Q276,104.57,281.64,99.64ZM157.73,280.25q6.51,12.6,13.61,24.89,7.23,12.54,15.07,24.71a435.28,435.28,0,0,1-44.24-7.13C146.41,309,151.63,294.75,157.73,280.25Zm0-48.33c-6-14.19-11.08-28.15-15.25-41.63,13.7-3.07,28.3-5.58,43.52-7.48q-7.65,11.94-14.72,24.23T157.7,231.92Zm10.9,24.17q9.48-19.77,20.42-38.78h0q10.93-19,23.27-37.13c14.28-1.08,28.92-1.65,43.71-1.65s29.52.57,43.79,1.66q12.21,18.09,23.13,37t20.69,38.6Q334,275.63,323,294.73h0q-10.91,19-23,37.24c-14.25,1-29,1.55-44,1.55s-29.47-.47-43.46-1.38q-12.43-18.19-23.46-37.29T168.6,256.09ZM340.75,305q7.25-12.58,13.92-25.49h0a440.41,440.41,0,0,1,16.12,42.32A434.44,434.44,0,0,1,326,329.48Q333.62,317.39,340.75,305Zm13.72-73.07q-6.64-12.65-13.81-25h0q-7-12.18-14.59-24.06c15.31,1.94,30,4.52,43.77,7.67A439.89,439.89,0,0,1,354.47,231.93ZM256.23,124.48h0a439.75,439.75,0,0,1,28.25,34.18q-28.35-1.35-56.74,0C237.07,146.32,246.62,134.87,256.23,124.48ZM145.66,65.86c16.06-9.32,51.57,4,89,37.27,2.39,2.13,4.8,4.36,7.2,6.67A491.37,491.37,0,0,0,201,160.51a499.12,499.12,0,0,0-64.06,10q-1.83-7.36-3.3-14.82h0C124.59,109.46,130.58,74.61,145.66,65.86ZM122.25,317.71q-6-1.71-11.85-3.71c-23.4-8-42.73-18.44-56-29.81C42.52,274,36.5,263.83,36.5,255.59c0-17.51,26.06-39.85,69.52-55q8.19-2.85,16.52-5.21a493.54,493.54,0,0,0,23.4,60.75A502.46,502.46,0,0,0,122.25,317.71Zm111.13,93.67c-18.63,16.32-37.29,27.89-53.74,33.72h0c-14.78,5.23-26.55,5.38-33.66,1.27-15.14-8.75-21.44-42.54-12.85-87.86q1.53-8,3.5-16a480.85,480.85,0,0,0,64.69,9.39,501.2,501.2,0,0,0,41.2,51C239.54,405.83,236.49,408.65,233.38,411.38Zm23.42-23.22c-9.72-10.51-19.42-22.14-28.88-34.64q13.79.54,28.08.54c9.78,0,19.46-.21,29-.64A439.33,439.33,0,0,1,256.8,388.16Zm124.52,28.59c-2.86,15.44-8.61,25.74-15.72,29.86-15.13,8.78-47.48-2.63-82.36-32.72-4-3.44-8-7.13-12.07-11a484.54,484.54,0,0,0,40.23-51.2,477.84,477.84,0,0,0,65-10.05q1.47,5.94,2.6,11.64h0C383.81,377.58,384.5,399.56,381.32,416.75Zm17.4-102.64h0c-2.62.87-5.32,1.71-8.06,2.53a483.26,483.26,0,0,0-24.31-60.94,481.52,481.52,0,0,0,23.36-60.06c4.91,1.43,9.68,2.93,14.27,4.52,44.42,15.32,71.52,38,71.52,55.43C475.5,274.19,446.23,298.33,398.72,314.11Z"></path>
            <path d="M256,298.55a43,43,0,1,0-42.86-43A42.91,42.91,0,0,0,256,298.55Z"></path>
          </g>
        </svg>
      </ProfileArea>
      <PostArea>
        <TextArea
            // textAreaRef 와 연결
            ref={textAreaRef}
            rows={1}
            value={post}
            placeholder="text your story"
            // e 를 위 onChange() 함수의 Parameter 로 전송
            onChange={(e) => onChange(e)}
            // 엔터키 입력 시 제출
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (textAreaRef.current) {
                  textAreaRef.current.form?.requestSubmit();  // 폼을 제출
                }
              }
            }}
        ></TextArea>
        <BottomMenu>
          {/* htmlFor 로 id=photo 태그를 안에 넣음 */}
          <AttachPhotoButton htmlFor="photo">
            {/* 사진 업로드가 되면 람다식 */}
            {file ? (
                <svg
                    height="10px"
                    width="10px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="#000000"
                    stroke="#000000"
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
                      <g id="check">
                        {" "}
                        <g>
                          {" "}
                          <polygon
                              points="11.941,28.877 0,16.935 5.695,11.24 11.941,17.486 26.305,3.123 32,8.818 "></polygon>
                          {" "}
                        </g>
                        {" "}
                      </g>
                      {" "}
                    </g>
                    {" "}
                  </g>
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z" fill="#0F0F0F"></path> </g></svg>
            )}
          </AttachPhotoButton>
          {/* accept 로 파일 포맷 지정 */}
          <AttachPhotoInput
              // e 를 위 onChangeFile() 함수의 Parameter 로 전송
              onChange={(e) => onChangeFile(e)}
              id="photo"
              type="file"
              accept="image/*"
          />
          <SubmitButton type="submit" value={loading ? "제출..." : "제출"}/>
        </BottomMenu>
      </PostArea>
    </Form>
  );
};
