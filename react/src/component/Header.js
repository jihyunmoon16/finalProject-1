import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import chodaeLogo from "../assets/Chodae-logo.png";
import searchIcon from "../assets/search.png";
import axios from "../plugins/axios";
import useStore from "../plugins/store";


function Header(props) {



  const store = useStore();
  let navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    if (localStorage.hasOwnProperty("accessToken") && localStorage.hasOwnProperty("refreshToken")) {
      // console.log("리프레쉬토큰으로 토큰을 새로 받아서 자동로그인")
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      store.continueLogin(accessToken, refreshToken);

    } else {
      store.logout();
    }
  }, []);

  const logout = () => {
    store.logout();

    navigate("/");
  };
  const goUniSearch = () => {
    // console.log(searchWord);
    store.setSearchWord(searchWord);
    navigate(`/unified/all?page=1&searchType=titleOrContent&keyword=${searchWord}&order=`);
  };
  const keyUpSearch = (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
      goUniSearch();
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSubContainer}>
        <div className={styles.header}>
          <div>
            <Link to="/">
              <img className={styles.chodaeLogo} src={chodaeLogo} alt=""></img>
            </Link>
          </div>

          <div className={styles.searchBar}>
            <div className={styles.searchIconContainer}>
              <img src={searchIcon} alt="" onClick={goUniSearch}></img>
            </div>
            <input
              className={styles.searchInput}
              placeholder="검색어를 입력해주세요"
              onChange={(event) => {
                const word = event.target.value;
                const replaced = word.replace(/(\s*)/g, "");
                // console.log(replaced);
                setSearchWord(replaced);

              }}
              onKeyUp={keyUpSearch}
            ></input>
          </div>

          {useStore.getState().member !== null ? (
            <nav className={styles.headerItems}>
              <Link className={styles.headerLink} to="/mypage/Mypagepost">
                마이페이지
              </Link>
              {/* <span>|</span> */}
              <button className={styles.headerLink} onClick={logout}>
                로그아웃
              </button>
            </nav>
          ) : (
            <nav className={styles.headerItems}>
              <Link className={styles.headerLink} to="/login">
                로그인
              </Link>
              {/* <span className={styles.line}>|</span> */}
              <Link className={styles.headerLink} to="/signup">
                회원가입
              </Link>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}


export default Header;
