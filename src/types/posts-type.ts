// 타입 스크립트로 post 형태 정의 /** */ 주석을 하면 필드에 설명 참조 가능

/** 게시글 타입 */
export type IPost = {
  /** PK id */
  id: string;
  /** 게시글 내용 */
  post: string;
  /** 사용자 이름 */
  nickname: string;
  /** 사용자 아이디 */
  userId: string;
  /** 게시 날짜 */
  createdAt: number;
  // 선택 사항으로 설정을 위해 ? 지정
  /** 사진 URL */
  photoUrl?: string;
};
