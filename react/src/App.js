import "./App.css";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import Main from "../src/component/Main";
import MenuBar from "../src/component/MenuBar";
import React, { useState } from "react";

import { Route, Routes } from "react-router-dom"; //리액트 라우터

//로그인 라우터 연결---------------------------------------------
import Login from "./views/login/Login"; //로그인
import Auth from "./views/login/Auth";
import Profile from "./views/login/Profile";
import Naver from "./views/login/Naver";

//faq 라우터 연결------------------------------------------------
import FAQ from "./views/faq/FAQ";

//회원정보 관리 라우터 연결---------------------------------------
import UserListComponent from "./views/Mypage/UserListComponent";
import AddUserComponent from "./views/Mypage/AddUserComponent";
import EditUserComponent from "./views/Mypage/EditUserComponent";

//아이디 및 비밀번호 찾기 라우터 연결------------------------------
import ForgetId from "./views/forget/ForgetId"; //아이디 찾기 처음화면
import ResultId from "./views/forget/ResultId"; //아이디찾기 결과
import ForgetPs from "./views/forget/ForgetPs"; // 비밀번호찾기
import ResetPs from "./views/forget/ResetPs"; // 비밀번호 리셋
import ResetCompleted from "./views/forget/ResetCompleted"; // 비밀번호 리셋완료
import Find from "./views/forget/Find";

//회원가입 라우터 연결--------------------------------------------
import Check from "./views/signup/Check"; //개인정보 동의서
import Registercopy from "./views/signup/Registercopy"; //회원가입폼

//게시판---------------------------------------------------------
import MainBoard from "./views/board/MainBoard"; //메인게시판
import FourTables from "./views/board/FourTables"; //실시간게시글
import CreatePost from "./views/board/CreatePost"; //게시판 글쓰기

import TechNews from "./views/board/itnews/TechNews"; //it뉴스게시판

import Customer from "./views/forget/Customer";
import CustomerFaq from "./views/forget/Faq"; // 고객센터 자주하는질문게시판
import FaqPost from "./views/forget/FaqPost"; //글 보기
import UpdatePost from "./views/board/UpdatePost";

//---------------------------------------------------
import data from "../src/views/Review/Reviewdata.js"; //국비지원리뷰의 데이터
import ReviewMain from "../src/views/Review/ReviewMain"; //국비지원 리뷰창
import Detail from "../src/views/Review/Detail";
//-----------------------------------------------------
import Study from "../src/views/Study/study";
//-----------------------------------------------

import Company from "./views/Footer/company"; // 푸터 상세페이지
import Tos from "./views/Footer/Tos";
//-----------------------------------------------
import Mypage from "./views/Mypage/Mypage"; //마이페이지
import Mypagepost from "./views/Mypage/Mypagepost"; //faqpost변형
import MypageBoard from "./views/Mypage/MypageBoard"; //faq변형
import MypageComment from "./views/Mypage/Comment/MypageComment";
import MypageInfo from "./views/Mypage/MyInfo";

//-----------------------------------------------
import NotFound from "./views/NotFound"; //404 page
import CreatePostCust from "./views/Study/CreatePostCust";
import StudyPost from "./views/Study/StudyPost";
import UpdateCusPost from "./views/Study/UpdateCusPost";
//----------------------------------------------------------------------------
import JobFair from "./views/event/Event"; //이벤트
import TestMainPage from "./views/quiz/TestMainPage";

//----------------------------------------------------------------------------
import UnifiedSearch from "./views/unifiedSearch/UnifiedSearch";
import Underconstruction from "./views/board/itnews/Underconstruction";

function App() {
  let [shoes, shoes1] = useState(data);

  const REST_API_KEY = "e9fdc52e3d35e33eb4ba5a732d2942ed";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=b57361b0269da06ba5b8bf17e32058f5&redirect_uri=http://localhost:3000/oauth/kakao/callback&response_type=code`;

  return (
    <div className="App">
      <Header />
      {/* <MenuBar /> */}

      <Routes>
        <Route path="/" element={<Main />} />

        {/* 로그인 메인화면 */}

        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={KAKAO_AUTH_URL}></Route>
        <Route path="/oauth/kakao/callback" exact element={<Auth />}></Route>
        <Route path="/oauth/redirect" element={<Naver />}></Route>
        <Route path="/profile" exact element={<Profile />}></Route>

        {/* 전체검색페이지 기본 모든 게시판 검색/ 검색결과 페이지에서 게시판 선택 가능*/}
        <Route path="/unified/:boardname" element={<UnifiedSearch />} />

        {/* mypage 메인화면*/}
        <Route path="/api/users" element={<UserListComponent />} />
        <Route path="/api/users/1" element={<EditUserComponent />} />
        <Route path="/api/users/2" element={<AddUserComponent />} />

        {/* 아이디찾기 메인화면 */}
        <Route path="/find" element={<Find />}>
          <Route path="id" element={<ForgetId />} />
          <Route path="id/result/:uid" element={<ResultId />} />
          <Route path="ps" element={<ForgetPs />} />
          <Route path="ps/reset/:uid" element={<ResetPs />} />
          <Route path="ps/done" element={<ResetCompleted />} />
        </Route>

        {/* 회원가입화면 */}
        <Route path="/signup" element={<Check />} />
        <Route path="/register" element={<Registercopy />} />

        {/* 게시판 메인화면 */}
        <Route path="/latestposts" element={<FourTables />} />
        <Route path="/mainboard" element={<MainBoard />}>
          <Route path="technews" element={<Underconstruction />} />
          <Route path="career" element={<CustomerFaq title="취업준비" />} />
          <Route path="career/:postno" element={<FaqPost />} />
          <Route path="career/create" element={<CreatePost />} />
          <Route path="career/:postno/update" element={<UpdatePost />} />

          <Route path="book" element={<CustomerFaq title="리뷰" />} />
          <Route path="book/:postno" element={<FaqPost />} />
          <Route path="book/create" element={<CreatePost />} />
          <Route path="book/:postno/update" element={<UpdatePost />} />

          <Route path="worry" element={<CustomerFaq title="고민상담" />} />
          <Route path="worry/:postno" element={<FaqPost />} />
          <Route path="worry/create" element={<CreatePost />} />
          <Route path="worry/:postno/update" element={<UpdatePost />} />
        </Route>

        {/* 공지사항 */}
        <Route path="/customer" element={<Customer />}>
          <Route path="notice" element={<CustomerFaq title="공지사항" />} />
          <Route path="notice/:postno" element={<FaqPost />} />
          <Route path="notice/create" element={<CreatePost />} />
          <Route path="notice/:postno/update" element={<UpdatePost />} />

          {/*Faq 메인화면 */}
          <Route path="/customer/FAQ" element={<FAQ />} />
        </Route>

        {/* 국비교육 */}
        <Route
          path="/reviewmain"
          element={<ReviewMain shoes={shoes} shoes1={shoes1} />}
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        {/* 스터디모집 */}
        <Route path="/together/study" element={<Study />} />
        <Route path="/together/study/create" element={<CreatePostCust />} />
        <Route path="/together/study/:postno" element={<StudyPost />} />
        <Route
          path="together/study/:postno/update"
          element={<UpdateCusPost />}
        />
        {/* 푸터 */}
        <Route path="/Company" element={<Company />} />
        <Route path="/tos" element={<Tos />} />

        {/* 이벤트 */}
        <Route path="/jobfair" element={<JobFair />} />
        <Route path="/testmainpage" element={<TestMainPage />} />

        {/* 마이페이지 */}
        <Route path="/mypage" element={<Mypage title="마이페이지" />}>
          <Route
            path="/mypage/Mypagepost"
            element={<MypageBoard title="마이페이지" />}
          ></Route>
          <Route path="/mypage/:postno" element={<Mypagepost />} />

          <Route path="/mypage/MypageComment" element={<MypageComment />} />
          <Route path="/mypage/:postno/update" element={<UpdatePost />} />
        </Route>
        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />

        {/* 마이페이지 */}
        <Route path="/mypage" element={<Mypage title="마이페이지" />}>
          <Route
            path="/mypage/Mypagepost"
            element={<MypageBoard title="마이페이지" />}
          ></Route>
          <Route path="/mypage/:postno" element={<Mypagepost />} />

          <Route path="/mypage/MypageComment" element={<MypageComment />} />
          <Route path="/mypage/:postno/update" element={<UpdatePost />} />

          <Route path="/mypage/info" element={<MypageInfo />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
