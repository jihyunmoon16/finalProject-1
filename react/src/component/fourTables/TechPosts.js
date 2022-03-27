import React, { useState, useEffect } from "react";
import axios from "../../plugins/axios";
import moment from "moment";
import styles from "../../views/board/FourTables.module.css";

function CareerPosts() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=f8e9dfcd44e64c4d965a292e3fb608df`
      )
      .then((response) => {
        // console.log(response);
        setNewsData(response.data.articles);
      });
  }, []);

  return (
    <table className={styles.fourTable}>
      <thead>
        <tr>
          <th className={styles.titleWidth}>제목</th>
          <th className={styles.nickNameWidth}>작성자</th>
          <th className={styles.dateWidth}>날짜</th>
        </tr>
      </thead>
      <tbody>
        {newsData.slice(0, 5).map((e) => (
          <tr key={e} onClick={() => window.open(e.url, "_blank")}>
            <td>{e.title.slice(0, 15)}...</td>
            <td>{e.author !== null && e.author.slice(0, 5)}...</td>
            <td>{moment(e.publishedAt).format("l")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CareerPosts;
