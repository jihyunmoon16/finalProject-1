import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../plugins/axios";
import styles from "./Forget.module.css";
import useStore from "../../plugins/store";

function ForgetPs() {
  const navigate = useNavigate();
  const store = useStore();

  const [id, setId] = useState("");
  const [idMsg, setIdMsg] = useState("");
  const [isValidId, setIsValidId] = useState(false);

  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const onChangeId = (event) => {
    const value = event.target.value;
    const replaceValue = value.replace(/(\s*)/g, ""); //공백제거
    setId(replaceValue);

    if (replaceValue.length === 0) {
      setIdMsg("");
      return;
    }

    //길이 체크
    if (replaceValue.length < 1 || 15 < replaceValue.length) {
      setIdMsg("아이디를 다시 확인해주세요");
      return;
    }

    //형식 체크
    const namePattern = /^[0-9|a-z|A-Z|]+$/; // 아이디는 영어,숫자만가능
    // console.log(namePattern.test(replaceValue));
    if (namePattern.test(replaceValue)) {
      setIsValidId(true);
      setIdMsg("");
    } else {
      setIsValidId(false);
      setIdMsg("영문과 숫자로만 작성해주세요.");
    }
  };

  const onChangeEmail = (event) => {
    const value = event.target.value;
    const replaceValue = value.replace(/(\s*)/g, ""); //공백제거
    setEmail(replaceValue);

    if (replaceValue.length === 0) {
      setEmailMsg("");
      return;
    }
    //길이 체크
    if (replaceValue.length < 1 || 45 < replaceValue.length) {
      setEmailMsg("이메일을 다시 확인해주세요");
      return;
    }

    //형식 체크
    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // console.log(namePattern.test(replaceValue));
    if (emailPattern.test(replaceValue)) {
      setIsValidEmail(true);
      setEmailMsg("");
    } else {
      setIsValidEmail(false);
      setEmailMsg("이메일을 다시 확인해주세요");
    }
  };

  const submitForm = async function (event) {
    event.preventDefault();

    if (!isValidEmail || !isValidId) {
      return;
    }
    //아이디와 이메일 일치하는 회원있을 경우 재설정 페이지로 이동
    await axios
      .get("/api/find/user", { params: { loginId: id, email: email } })
      .then((response) => {
        const data = response.data;
        // console.log(response.data);
        if (data.length !== null) {
          // console.log("비밀번호존재 비밀번호 재설정 페이지로 이동");
          navigate(`/find/ps/reset/${response.data}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.mainBody}>
      <div className={styles.container}>
        <div className={styles.heading}>비밀번호 찾기</div>
        <hr></hr>
        <div className={styles.content}>
          <div className={styles.contentHeader}>비밀번호를 잊어버리셨나요?</div>
          <div className={styles.contentHeader}>
            비밀번호는 가입시 입력하신 <br />
            아이디와 이메일을 통해 찾을 수 있습니다.
          </div>
          <hr />
          <form className={styles.searchForm}>
            <div className={styles.nameInput}>
              <input
                name="userName"
                className={styles.inputBox}
                onChange={onChangeId}
                placeholder="아이디를 입력해주세요"
              />
              {!isValidId && <div className={styles.errorMessage}>{idMsg}</div>}
            </div>
            <div className={styles.emailInput}>
              <input
                name="email"
                className={styles.inputBox}
                onChange={onChangeEmail}
                placeholder="이메일을 입력해주세요"
              />
              {!isValidEmail && (
                <div className={styles.errorMessage}>{emailMsg}</div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className={styles.loginBtn}
                onClick={submitForm}
              >
                찾기
              </button>
            </div>
            <div>
              <Link to="/">
                <button type="button" className={styles.loginBtn}>
                  로그인 화면으로 돌아가기
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPs;
