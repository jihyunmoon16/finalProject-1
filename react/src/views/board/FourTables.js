import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import styles from "./FourTables.module.css";

const WorryPosts = lazy(() => import("../../component/fourTables/WorryPosts"));
const CareerPosts = lazy(() => import("../../component/fourTables/CareerPosts"));
const BookPosts = lazy(() => import("../../component/fourTables/BookPosts"));
const TechPosts = lazy(() => import("../../component/fourTables/TechPosts"));

function FourTables() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>실시간 게시판</div>
      <div className={styles.fourTablesContainer}>
        <div className={styles.tableBox}>
          <Link className={styles.fourTableLink} to="/mainboard/worry">
            <h3>고민상담 게시판</h3>
          </Link>
          <Suspense fallback={<div>로딩중...</div>}>
            <WorryPosts />
          </Suspense>
        </div>
        <div className={styles.tableBox}>
          <Link className={styles.fourTableLink} to="/mainboard/career">
            <h3>취업준비 게시판</h3>
          </Link>
          <Suspense fallback={<div>로딩중...</div>}>
            <CareerPosts />
          </Suspense>
        </div>

        <div className={styles.tableBox}>
          <Link className={styles.fourTableLink} to="/mainboard/book">
            <h3>리뷰 게시판</h3>
          </Link>
          <Suspense fallback={<div>로딩중...</div>}>
            <BookPosts />
          </Suspense>
        </div>
        {/* <div className={styles.tableBox}>
          <Link className={styles.fourTableLink} to="/mainboard/technews">
            <h3>IT뉴스 게시판</h3>
          </Link>
          <Suspense fallback={<div>로딩중...</div>}>
            <TechPosts />
          </Suspense>
        </div> */}
      </div>
    </div>
  );
}

export default FourTables;
