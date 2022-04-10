import React, { useEffect, useState } from "react";
import StartScreen from "./StartScreen";
import LevelTest from "./LevelTest";
import EndScreen from "./EndScreen";
import { GameStateContext } from "../../plugins/Contexts";
import styles from "./TestMainPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../plugins/store";

function TestMainPage() {
  const navigate = useNavigate();

  const nickname =
    useStore.getState().nickname !== null
      ? useStore.getState().nickname
      : null;

  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);

  if (nickname) {
    return (
      <div className={styles.testMainPageContainer}>
        <GameStateContext.Provider
          value={{
            gameState,
            setGameState,
            score,
            setScore,
          }}
        >
          {gameState === "start" && <StartScreen />}
          {gameState === "playing" && <LevelTest />}
          {gameState === "finished" && <EndScreen />}
        </GameStateContext.Provider>
      </div>
    );
  } else {
    return (
      <div className={styles.testMainPageContainer}>
        <div className={styles.alertContainer}>
          <h1>테스트 시작 전, 로그인 해주세요 :-)</h1>
          <div className={styles.goBackBtnWrapper}>
            <button className={styles.goBackBtn}>
              <Link className={styles.goBackLink} to="/">
                메인 페이지로 이동
              </Link>
            </button>
            <button className={styles.goBackBtn}>
              <Link className={styles.goBackLink} to="/login">
                로그인 페이지로 이동
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TestMainPage;
