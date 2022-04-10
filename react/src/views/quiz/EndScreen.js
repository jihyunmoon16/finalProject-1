import React, { useContext } from "react";
import { GameStateContext } from "../../plugins/Contexts";
import { Questions } from "./Questions";
import styles from "./TestMainPage.module.css";
import useStore from "../../plugins/store";
import { useNavigate } from "react-router-dom";

function EndScreen() {
  // const store = useStore();
  const navigate = useNavigate();
  const nickname =
    useStore.getState().nickname !== null
      ? useStore.getState().nickname
      : null;
  const { score, setScore, setGameState } = useContext(GameStateContext);

  const restartQuiz = () => {
    setScore(0);
    setGameState("start");
  };

  const backToMain = () => {
    navigate("/");
  };

  const renderQuestionLevel = () => {
    if (score >= 8) {
      return (
        <p className={styles.startScreenP}>
          총 {Questions.length}에서 {score}개나 맞추시다니, <br />
          고수시네요!
        </p>
      );
    } else if (score >= 5) {
      return (
        <p className={styles.startScreenP}>
          총 {Questions.length}에서 {score}개를 맞추셨네요, <br />곧 고수가
          되실거예요!
        </p>
      );
    } else {
      return (
        <p className={styles.startScreenP}>
          총 {Questions.length}에서 {score}개를 맞추셨네요, <br />
          초보지만 곧 고수가 되실거예요!
        </p>
      );
    }
  };

  return (
    <div className={styles.startScreenContainer}>
      <h1 className={styles.startScreenH1}>
        <span className={styles.nickname}>{nickname}</span>님, 고생하셨습니다.
      </h1>
      {renderQuestionLevel()}
      <div className={styles.startScreenImage}>
        <div className={styles.EndScreenBtnWrapper}>
          <button className={styles.endScreenBtn} onClick={restartQuiz}>
            다시하기
          </button>
          <button className={styles.endScreenBtn} onClick={backToMain}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndScreen;
