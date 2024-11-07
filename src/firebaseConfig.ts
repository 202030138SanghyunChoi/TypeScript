// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj8ELbVQ498hlQq1nRrEf-9mO7I4bMJPI",
  authDomain: "daelimx-6f5a2.firebaseapp.com",
  projectId: "daelimx-6f5a2",
  storageBucket: "daelimx-6f5a2.appspot.com",
  messagingSenderId: "214559131897",
  appId: "1:214559131897:web:f973acdab806bab7703a28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// FireBase 인증 정보 객체 설정
export const auth = getAuth(app);

// Firestore 인스턴스 가져오기
// Firebase SDK 에서 제공하는 함수로 데이터베이스 객체
export const firestore = getFirestore(app);
