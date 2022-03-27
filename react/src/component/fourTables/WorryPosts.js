import React, { useState, useEffect } from "react";
import axios from "../../plugins/axios";
import { Link } from "react-router-dom";
import moment from "moment";
import styles from "../../views/board/FourTables.module.css";

function WorryPosts() {
  const [posts, setPosts] = useState([]);

  async function retrievePosts() {
    await axios
      .get("/worry?page=1&searchType=&keyword=&order=")
      .then((response) => setPosts(response.data.content));
  }
  useEffect(() => {
    retrievePosts();
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
        {posts.slice(0, 5).map((post) => (
          <tr key={post.postNo}>
            <td>
              <Link
                className={styles.fourTableLink}
                to={`/mainboard/worry/${post.postNo}`}
              >
                {post.postTitle}
              </Link>
              {post.replyCount > 0 && <span>[{post.replyCount}]</span>}
            </td>
            <td>{post.nickname}</td>
            <td>{moment(post.postRegdate).format("l")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WorryPosts;
