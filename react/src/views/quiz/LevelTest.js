import React, { useState, useContext } from "react";
import { Questions } from "./Questions";
import styles from "./TestMainPage.module.css";
import { GameStateContext } from "../../plugins/Contexts";

function LevelTest() {
  const { score, setScore, gameState, setGameState } =
    useContext(GameStateContext);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const nextQuestion = () => {
    if (Questions[currentQuestion].asnwer === optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const finishQuiz = () => {
    if (Questions[currentQuestion].asnwer === optionChosen) {
      setScore(score + 1);
    }
    setGameState("finished");
  };

  return (
    <div className={styles.levelTestContainer}>
      <h1 className={styles.levelTestH1}>
        {Questions[currentQuestion].prompt}
      </h1>
      <div className={styles.questions}>
        <button
          onClick={() => {
            chooseOption("optionA");
          }}
        >
          {Questions[currentQuestion].optionA}
        </button>
        <button
          onClick={() => {
            chooseOption("optionB");
          }}
        >
          {Questions[currentQuestion].optionB}
        </button>
        <button
          onClick={() => {
            chooseOption("optionC");
          }}
        >
          {Questions[currentQuestion].optionC}
        </button>
        <button
          onClick={() => {
            chooseOption("optionD");
          }}
        >
          {Questions[currentQuestion].optionD}
        </button>
      </div>

      <div className={styles.questions}>
        {currentQuestion === Questions.length - 1 ? (
          <button onClick={finishQuiz} className={styles.nextQuestion}>
            테스트 끝내기
          </button>
        ) : (
          <button onClick={nextQuestion} className={styles.nextQuestion}>
            다음 문제
          </button>
        )}
      </div>
    </div>
  );
}

export default LevelTest;
