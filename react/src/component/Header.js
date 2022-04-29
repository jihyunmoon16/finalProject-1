import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import chodaeLogo from "../assets/Chodae-logo.png";
import searchIcon from "../assets/search.png";
import useStore from "../plugins/store";
import { FaUser } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import MenuBar from "./MenuBar";
import Navbar from "../component/headerNavbar/Navbar";

function Header(props) {
  const store = useStore();
  let navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  useEffect(() => {
    if (
      localStorage.hasOwnProperty("accessToken") &&
      localStorage.hasOwnProperty("refreshToken")
    ) {
      // console.log("리프레쉬토큰으로 토큰을 새로 받아서 자동로그인")
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      store.continueLogin(undefined, accessToken, refreshToken);
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
    navigate(
      `/unified/all?page=1&searchType=titleOrContent&keyword=${searchWord}&order=`
    );
  };
  const keyUpSearch = (e) => {
    // console.log(e.key);
    if (e.key === "Enter") {
      goUniSearch();
    }
  };

  return (
    <div className={styles.headerContainer}>
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
        {useStore.getState().isLogin ? (
          <nav className={styles.headerItems}>
            <button className={styles.headerBtn}>
              <Link className={styles.headerLink} to="/mypage/Mypagepost">
                마이페이지
              </Link>
            </button>
            <button className={styles.headerBtn} onClick={logout}>
              로그아웃
            </button>
          </nav>
        ) : (
          <nav className={styles.headerItems}>
            <button className={styles.headerBtn}>
              <Link className={styles.headerLink} to="/login">
                로그인
              </Link>
            </button>
            <button className={styles.headerBtn}>
              <Link className={styles.headerLink} to="/signup">
                회원가입
              </Link>
            </button>
          </nav>
        )}
        {/* 안보이다가 900밑으로 내려가면 보여줌. */}
        <div className={styles.showWrapper}>
          {useStore.getState().isLogin ? (
            <Link className={styles.headerLink} to="/mypage/Mypagepost">
              <FaUser className={styles.show} />
            </Link>
          ) : (
            <Link className={styles.headerLink} to="/login">
              <FaUser className={styles.show} />
            </Link>
          )}

          <div onClick={handleClick}>
            {click ? (
              <FaTimes className={styles.show} />
            ) : (
              <FaBars className={styles.show} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.showNavbar}>
        <Navbar props={click} />
      </div>
      <div className={styles.menuBarNone}>
        <MenuBar />
      </div>
    </div>
  );
}

export default Header;
