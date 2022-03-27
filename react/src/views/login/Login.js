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
import { BrowserRouter as Routes, Route } from "react-router-dom";

function Login() {
  const REST_API_KEY = "e9fdc52e3d35e33eb4ba5a732d2942ed";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=b57361b0269da06ba5b8bf17e32058f5&redirect_uri=http://localhost:3000/oauth/kakao/callback&response_type=code`;

  const store = useStore();

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

        store.setMemberInfo(dt.member);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate(-1);

        // console.log(
        //   "useStore.getState().member.nickname",
        //   useStore.getState().member.nickname
        // );
        // console.log("useStore.getState().member", useStore.getState().member);
        // console.log(dt);
        // console.log(dt.member);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  function goAuth() {
    window.location.href = KAKAO_AUTH_URL;
  }

  // const data = { loginId: loginId, password: password };
  // console.log(data);

  // const formData = new FormData();
  // formData.append("loginId", loginId);
  // formData.append("password", password);

  // axios.post("/api/login", formData)
  //   .then((response) => {

  //     //console.log(response.headers.get('Authorization'))
  //     console.log(response.data)
  //     const token = response.data;

  //     // localStorage.setItem("username", data.username);

  //     // const please = token.split('.')[1]
  //     // const payload = Buffer.from(please, 'base64');
  //     // const result = JSON.parse(payload.toString());
  //     // localStorage.setItem('result2', JSON.stringify(result));
  //     // console.log(result);

  //     // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
  //     // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

  //     // console.log(localStorage.getItem("hi"))

  //   }).catch((error) => {
  //     console.log(error);
  //   });

  // const login = () => {
  //   const data = { username: username, password: password };
  //   console.log(data);
  //   // navigate(-1);
  // };

  // let navigate = useNavigate();
  // const { Kakao } = window;


  // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
  //       console.log(localStorage.getItem("hi"))
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  // };
  //

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
      {
        <button className={styles.kakaoBtn} onClick={goAuth}>
          <img className={styles.kakaoImg} src={kakao} alt="kakao_button" />
        </button>
      }
    </div>
  );
}
export default Login;
