import { useRef, useState } from "react";
import styled from "styled-components";
import { auth, firestore } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const Form = styled.form`
  display: flex;
  border: 1px solid black;
  padding: 20px;
  gap: 10px;
`;
const ProfileArea = styled.div`
  background: red;
  width: 50px;
  height: 40px;
`;
const PostArea = styled.div`
  // 컨텐츠 차지 영역을 제외하고 남은 영역 차지 비율 1 == 영역 전체 차지
  flex: 1;
`;

const TextArea = styled.textarea`
  /* text area 크기 조절 못하게 */
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
  background-color: white;
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
      <ProfileArea></ProfileArea>
      <PostArea>
        <TextArea
          // textAreaRef 와 연결
          ref={textAreaRef}
          rows={1}
          value={post}
          placeholder="text your story"
          // e 를 위 onChange() 함수의 Parameter 로 전송
          onChange={(e) => onChange(e)}
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
                        <polygon points="11.941,28.877 0,16.935 5.695,11.24 11.941,17.486 26.305,3.123 32,8.818 "></polygon>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            ) : (
              "사진 업로드"
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
          <SubmitButton type="submit" value={loading ? "제출..." : "제출"} />
        </BottomMenu>
      </PostArea>
    </Form>
  );
};