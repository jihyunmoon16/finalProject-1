import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../plugins/axios";
import useStore from "../../plugins/store";

import jwt_decode from "jwt-decode";
import Profile from "./Profile";
import styles from "./Login.module.css";
import { Buffer } from "buffer";

import kakao from "../../assets/kakao.png";
import Auth from "../../views/login/Auth";
import naver from "../../assets/naver2.png";
import { BrowserRouter as Routes, Route } from "react-router-dom";

function Login() {
  const store = useStore();

  const REST_API_KEY = "e9fdc52e3d35e33eb4ba5a732d2942ed";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=b57361b0269da06ba5b8bf17e32058f5&redirect_uri=http://localhost:3000/oauth/kakao/callback&response_type=code`;

  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const login = async () => {
    const formData = new FormData();
    formData.append("loginId", loginId);
    formData.append("password", password);

    await axios
      .post("/api/login", formData)
      .then((response) => {
        // console.log(response.data);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const dt = jwt_decode(accessToken);

        store.setMemberInfo(dt.nickname, dt.role);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate(-1);

      })
      .catch((error) => {
        alert("아이디와 비밀번호를 다시 확인해주세요.");
        console.log(error);
      });
  };

  function goKakao() {
    // window.location.href = KAKAO_AUTH_URL;
    window.location.href = `${store.getBaseUrl()}/oauth2/authorization/kakao`;
  }

  function goNaver() {
    window.location.href = `${store.getBaseUrl()}/oauth2/authorization/naver`;
  }


  return (
    <div className={styles.loginContainer}>
      <label>아이디: </label>
      <input
        autoFocus
        className={styles.loginInput}
        type="text"
        name="id"
        onChange={(event) => setloginId(event.target.value)}
      ></input>

      <label>비밀번호: </label>
      <input
        className={styles.loginInput}
        type="password"
        name="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      ></input>
      <button className={styles.loginBtn} onClick={login}>
        로그인
      </button>
      <Link to="/find/id">
        <button className={styles.loginBtn}>ID/PW 찾기</button>
      </Link>
      <div>
        {
          <img className={styles.socialBtn} onClick={goNaver} src={naver} alt="naver_button" />
        }
        {/* {
          <img className={styles.socialBtn} onClick={goKakao} src={kakao} alt="kakao_button" />
        } */}
      </div>
    </div>
  );
}
export default Login;
