import styled from "styled-components";
import { IPost } from "../types/posts-type";
import { auth, firestore } from "../firebaseConfig";
import moment from "moment";
import Item from "./Post-ItemMenu";
import { deleteDoc, doc } from "firebase/firestore";

const Container = styled.div`
  border: 1px solid black;
  padding: 10px 15px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const ProfileArea = styled.div``;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  /* div 를 동그라미로 변경 */
  border-radius: 50%;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 5px;
  /* 아이템들을 하단에 맞추어 정렬 */
  align-items: flex-end;
`;

const UserEmail = styled.div`
  font-size: 10px;
  color: #0e0e88;
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 15px;
`;

const PostText = styled.div`
  font-size: 17px;
`;

const CreateTime = styled.div`
  font-size: 12px;
  color: #b6b6b6;
`;

const Footer = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  display: flex;
  gap: 15px;
`;

const Topbar = styled.div`
  display: flex;
  /* 좌우 끝 정렬. 홀수일 경우 좌 가운데 우 끝 정렬. */
  justify-content: space-between;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  font-size: 10px;
`;

// 기본 프로필 이미지
const defaultProfileImage = "https://www.svgrepo.com/show/535711/user.svg";

// TimeLine.tsx 에서 받을 Property 설정 (각각의 post 의 데이터를 구조체 형태로, 타입스크립트 때문에 IPost 로 타입 지정)
export default ({ id, userId, createdAt, nickname, post, photoUrl }: IPost) => {
  // 현재 유저
  const currentUser = auth.currentUser;

  const onDelete = async () => {
    const isOk = window.confirm("게시글을 삭제하시겠습니까?");

    // 삭제 처리
    if (isOk) {
      // 서버 통신 시에는 try catch
      try {
        // 삭제 수행s
        // 비동기 처리
        // firestore 객의 posts 라는 이름의 컬렉션에서 해당 PK id 게시글을 받아오기
        const removeDoc = await doc(firestore, "posts", id);
        // 위에서 구한 removeDoc 를 삭제
        await deleteDoc(removeDoc);
      } catch (e) {
        console.error("post delete error: " + e);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <ProfileArea>
          {/* OR 연산자를 이용하여 photoUrl 이 존재하면 무조건 true 이기 때문에 뒤에 코드 실행 X.(반대로 photoUrl 이 존재 안하면 뒤 코드만 true 로 실행 */}
          <ProfileImg src={photoUrl || defaultProfileImage} />
        </ProfileArea>
        <Content>
          <Topbar>
            <UserInfo>
              <UserName>{nickname}</UserName>
              {
                // and 연산자를 이용했기 때문에 auth.currentUser 가 false 면 후연산인 auth.currentUser.email 는 실행되지 않음. 하나라도 false 면 false 이기 때문에 계산 처리 완료
                auth.currentUser && (
                  <UserEmail>{auth.currentUser.email}</UserEmail>
                )
              }
            </UserInfo>
            {/* ? 를 통해 옵션값 처리를 통해 앞에 값이 없으면 실행하지 않음 */}
            {/* and 연산자를 이용했기 때문에 auth.currentUser 가 false 면 후연산인 auth.currentUser.email 는 실행되지 않음. 하나라도 false 면 false 이기 때문에 계산 처리 완료 */}
            {userId === currentUser?.uid && (
              <DeleteBtn onClick={onDelete}>X</DeleteBtn>
            )}
          </Topbar>
          <PostText>{post}</PostText>
          {/* moment 패키지를 사용하여 UTC 시간 포맷 */}
          <CreateTime>{moment(createdAt).fromNow()}</CreateTime>
        </Content>
      </Wrapper>
      <Footer>
        <Item type="like" num={83} />
        <Item type="view" num={3000} />
        <Item type="comment" num={30} />
      </Footer>
    </Container>
  );
};
