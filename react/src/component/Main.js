import React from "react";
import styles from "./Main.module.css";
import { Link, useNavigate } from "react-router-dom";
import bootCampImg from "../assets/main/static.svg";
import studyImg from "../assets/main/pairprogramming.svg";
import teaImg from "../assets/main/tea.svg";
import zoomImg from "../assets/main/zoom.svg";
import boardImg from "../assets/main/text.svg";

function Main() {
  let navigate = useNavigate();

  const moveToStudy = () => {
    navigate("/together/study");
  };

  return (
    <>
      <div className={styles.sectionHero}>
        <div className={styles.hero}>
          <div className={styles.textBox}>
            <h1 className={styles.heading}>국비교육</h1>
            <p className={styles.description}>
              국비과정 참여 전에 교육기관에 <br />
              대한 정보와 교육과정에 대한 리뷰를 <br />
              확인해보세요.
            </p>
            <Link to="/reviewmain">
              <button className={styles.mainBtn}>리뷰보기</button>
            </Link>
          </div>
          <div className={styles.imgBox}>
            <img className={styles.bootCampImg} src={bootCampImg} alt=""></img>
          </div>
        </div>
      </div>
      <div className={styles.sectionStudy}>
        <div className={styles.studyTextBox}>
          <h1 className={styles.heading}>스터디모집</h1>
          <p className={styles.description}>
            코딩을 더 잘하고 싶다면, 스터디 그룹에 참여해보세요. <br />
            나와 같은 분야를 공부하고 있는 사람들과 <br />
            함께하면 어려운 프로그래밍도 즐겁지 않을까요?
          </p>
        </div>
        <div className={styles.study}>
          <div className={styles.studyImgBox} onClick={moveToStudy}>
            <img className={styles.studyImg} src={teaImg} alt=""></img>
            <p className={styles.studyText}>With a Cup of Tea</p>
          </div>
          <div className={styles.studyImgBox} onClick={moveToStudy}>
            <img className={styles.studyImg} src={studyImg} alt=""></img>
            <p className={styles.studyText}> Let's Study Together</p>
          </div>
          <div className={styles.studyImgBox} onClick={moveToStudy}>
            <img className={styles.studyImg} src={zoomImg} alt=""></img>
            <p className={styles.studyText}>Online or Offline</p>
          </div>
        </div>
      </div>
      <div className={styles.sectionBoard}>
        <div className={styles.board}>
          <div className={styles.imgBox}>
            <img className={styles.boardImg} src={boardImg} alt=""></img>
          </div>
          <div className={styles.textBox}>
            <h1 className={styles.heading}>게시판</h1>
            <p className={styles.description}>
              취업준비, 고민상담, 책/강의 리뷰 게시판을 통해서 <br /> 초대
              커뮤니티에 참여해보세요.
            </p>
            <Link to="/latestposts">
              <button className={styles.mainBtn}>게시판 보기</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
