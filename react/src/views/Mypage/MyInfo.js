import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../plugins/axios";
import styles from "./MyInfo.module.css";
import useStore from "../../plugins/store";

import { AiOutlineWarning } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";

function MyInfo() {
  //닉네임만 조회, 수정가능
  //어떤 소셜과 연동되어있는지 확인 가능
  //확인 후 연동해제 기능 => 어떻게 처리할 것인지?

  const store = useStore();
  const navigate = useNavigate();

  const currentNickname = store.getNickname();

  const [onUpdate, setOnUpdate] = useState(false);

  const [nickname, setNickname] = useState(currentNickname);
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [isValidNickname, setIsValidNickname] = useState(true);

  useEffect(() => {
    // getUserInfo(currentNickname);
  }, []);

  function fieldsetDisable() {
    if (!isValidNickname) {
      return;
    }

    const nicknameInput = document.getElementById("nickname");
    nicknameInput.disabled = true;
    setOnUpdate(false);

    //닉네임 업데이트
    updateUserInfo(currentNickname, nickname);
    setNicknameMsg("");
  }
  function fieldsetWritable() {
    const nicknameInput = document.getElementById("nickname");
    nicknameInput.disabled = false;
    setOnUpdate(true);
  }

  async function getUserInfo(nickname) {
    await axios
      .get("/api/user/info", { params: { nickname: nickname } })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }
  // 닉네임 업데이트 함수
  async function updateUserInfo(currentNickname, nickname) {
    if (currentNickname === nickname) {
      return;
    }

    const formData = new FormData();
    formData.append("currentNickname", currentNickname);
    formData.append("newNickname", nickname);

    await axios
      .put("/api/user/info", formData)
      .then((response) => {
        //업데이트된 닉네임 정보로 다시 토큰 발급
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        store.continueLogin(nickname, accessToken, refreshToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changeNickname(event) {
    setIsValidNickname(false);
    // console.log(event.target.value);
    const value = event.target.value;
    const replaceValue = value.replace(/(\s*)/g, ""); //공백제거
    setNickname(replaceValue);

    if (replaceValue.length === 0) {
      setNicknameMsg("");
      return;
    }

    //길이 체크
    if (replaceValue.length < 1 || 8 < replaceValue.length) {
      setNicknameMsg("8글자 이내로 작성해주세요");
      return;
    }

    //형식 체크
    const pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/; // 영어,한글만 가능

    if (pattern.test(replaceValue)) {
      setIsValidNickname(true);
      setNicknameMsg("");
    } else {
      setNicknameMsg("한글과 영문으로만 작성해주세요.");
    }
  }

  async function checkNickname(event) {
    // console.log(event);
    event.preventDefault();

    if (!isValidNickname) {
      return;
    }

    //닉네임 영문한글 최대 8글자 이내만 가능 형식 체크후 중복검사
    await axios
      .get("/api/user/check", { params: { nickname: nickname } })
      .then((response) => {
        // console.log(response);
        setIsValidNickname(true);
        setNicknameMsg("사용할 수 있습니다.");
      })
      .catch((error) => {
        console.log(error);
        setIsValidNickname(false);
        setNicknameMsg("중복된 닉네임입니다.");
      });
  }

  async function chodaeLeave() {
    const result = window.confirm("회원탈퇴를 진행하시겠습니까?");
    // console.log(result);

    if (result) {
      // console.log("회원탈퇴");
      await axios
        .delete(`/api/user/bye/${nickname}`)
        .then((response) => {
          console.log(response);
          store.logout();
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <div className={styles.boardContainer}>
        <h1 className={styles.heading}>내 정보</h1>
        <div>
          <label>닉네임: </label>
          <input
            id="nickname"
            className={styles.nicknameInput}
            type="text"
            name="nickname"
            value={nickname}
            onChange={changeNickname}
            disabled
          ></input>
          {onUpdate ? (
            <button className={styles.checkBtn} onClick={checkNickname}>
              중복검사
            </button>
          ) : null}
          {!isValidNickname && (
            <span className={styles.errorMessage}>
              {nicknameMsg.length > 0 && (
                <AiOutlineWarning className={styles.msgIcon} />
              )}
              {nicknameMsg}
            </span>
          )}
          {isValidNickname && (
            <span className={styles.okMessage}>
              {nicknameMsg.length > 0 && (
                <AiOutlineCheckCircle className={styles.msgIcon} />
              )}
              {nicknameMsg}
            </span>
          )}
        </div>
        <div className={styles.comBox}>
          {!onUpdate ? (
            <button className={styles.checkBtn} onClick={fieldsetWritable}>
              수정하기
            </button>
          ) : (
            <button className={styles.checkBtn} onClick={fieldsetDisable}>
              수정완료
            </button>
          )}
          <button className={styles.checkBtn} onClick={chodaeLeave}>
            회원 탈퇴
          </button>
        </div>
      </div>
    </>
  );
}
export default MyInfo;
