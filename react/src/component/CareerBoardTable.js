import React from "react";
import styles from "./CareerBoardTable.module.css";
import useStore from "../plugins/store";

function CareerBoardTable({ tableData }) {
  const baseUrl = useStore((state) => state.url);

  const {
    nickname,
    postLike,
    postViews,
    postRegdate,
    postContent,
    postTitle,
    category,
    filename,
  } = tableData;

  return (
    <div className={styles.boardTableContainer}>
      <table className={styles.boardTable}>
        <thead>
          <tr>
            <th colSpan={5}>
              <div className={styles.postCategory}>
                {category !== null &&
                  category.map((category, index) => (
                    <span
                      key={category.categoryName + index}
                      className={styles[`cate${index}`]}
                    >
                      #{category.categoryName}
                    </span>
                  ))}
              </div>
            </th>
          </tr>
          <tr>
            <th className={styles.postTitle} colSpan={5}>
              {postTitle}
            </th>
          </tr>
          <tr className={styles.wSubTitle}>
            <td className={styles.wAuthor}>작성자: {nickname}</td>
            <td className={styles.wView}>조회수: {postViews}</td>
            <td className={styles.wLike}>추천수: {postLike}</td>
            <td className={styles.wDate}>
              작성일: {postRegdate}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {filename !== null &&
              filename.map((name, i) => (
                <td key={i}>
                  <img
                    className={styles.miss}
                    src={`${baseUrl}/get/image/${name.filename}`}
                    width="200%"
                    alt="이미지"
                  />
                </td>
              ))}
          </tr>
          <tr>
            <td className={styles.postContent} colSpan={5}>
              {postContent.content}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CareerBoardTable;
