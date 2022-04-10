import React, { useContext } from "react";
import { GameStateContext } from "../../plugins/Contexts";

import styles from "./TestMainPage.module.css";
import useStore from "../../plugins/store";

function StartScreen() {
  const store = useStore();
  const nickname =
    useStore.getState().nickname !== null
      ? useStore.getState().nickname
      : null;

  const { gameState, setGameState } = useContext(GameStateContext);

  return (
    <div className={styles.startScreenContainer}>
      <div className={styles.startScreenTextContainer}>
        <h1 className={styles.startScreenH1}>
          안녕하세요! <span className={styles.nickname}>{nickname}</span>님,
        </h1>
        <p className={styles.startScreenP}>
          간단한 컴퓨터 관련 문제를 풀어보세요!
        </p>
      </div>
      <div className={styles.startScreenImage}>
        <div className={styles.startScreenBtnWrapper}>
          <button
            className={styles.startScreenBtn}
            onClick={() => {
              setGameState("playing");
            }}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
