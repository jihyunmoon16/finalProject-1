import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { Link } from "react-router-dom";
import studyImg from "../assets/main/studyBeige.jpg";
import bootCampImg from "../assets/main/bootcamp.jpg";
import boardImg from "../assets/main/news.jpg";
import useStore from "../plugins/store";

function Main() {
  const store = useStore();
  // console.log(store.getMemberRole());

  return (
    <div className={styles.mainContainer}>
      <div className={styles.bootCampBg}>
        <div className={styles.bootCampWrapper}>
          <div className={styles.bootCampText}>
            <h1>국비교육</h1>
            <p>
              국비교육에 대한 정보를 찾고 계신가요? <br />
              아래버튼을 눌러보세요!
            </p>
            <Link to="/reviewmain">
              <button className={styles.mainBtn}>입장하기</button>
            </Link>
          </div>
          <div className={styles.bootCampImgWrapper}>
            <img
              className={styles.bootCampImg}
              src={bootCampImg}
              alt="bootCampImg"
            ></img>
          </div>
        </div>
      </div>

      <div className={styles.studyBg}>
        <div className={styles.studyLeft}>
          <div>
            <h1 className={styles.studyTitle}>스터디 모집</h1>
            <p className={styles.studySubTitle}>
              처음 시작한 코딩 공부, 어려우신가요? <br />
              스터디 그룹에 참여해보세요!
            </p>
            <Link to="/together/study">
              <button className={styles.mainBtn}>입장하기</button>
            </Link>
          </div>
        </div>
        <div className={styles.studyRight}>
          <img className={styles.studyImg} src={studyImg} alt="studyImg"></img>
        </div>
      </div>

      <div className={styles.boardBg}>
        <div className={styles.boardLeft}>
          <img className={styles.boardImg} src={boardImg} alt="boardImg"></img>
        </div>
        <div>
          <div className={styles.boardText}>
            <h1 className={styles.studyTitle}>게시판</h1>
            <p className={styles.studySubTitle}>
              IT 뉴스, 취업준비, 고민상담등의 게시판입니다.
              <br />
              아래버튼을 누르시면 됩니다.
            </p>
            <Link to="/latestposts">
              <button className={styles.mainBtn}>입장하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
