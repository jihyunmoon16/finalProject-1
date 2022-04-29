import React from "react";
import styles from "./Underconstruction.module.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div id={styles.main}>
        <div class={styles.fof}>
          <h1>Under Construction</h1>
          <p>IT 뉴스게시판은 현재 준비중입니다.</p>
          <div className={styles.notFoundLinkWrapper}>
            <Link className={styles.notFoundLink} to="/">
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
