import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import styles from "./SearchBar.module.css";
import axios from "../../plugins/axios";

function SearchBar({ getData }) {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location);
  const idx = location.pathname.indexOf("/", 1);
  // console.log(idx);
  const boardGroup = location.pathname.slice(1, idx);
  const boardName = location.pathname.slice(idx + 1);
  // console.log(boardName);

  const [searchBy, setSearchBy] = useState("titleOrContent"); //초기값은 드롭박스 처음 값으로 설정.
  const [searchTerm, setSearchTerm] = useState("");

  const onClick = () => {
    // console.log("자식컴포넌트 ", searchBy, searchTerm);

    searchList(searchBy, searchTerm);
  };

  const searchList = async function (searchBy, searchTerm) {
    let url = `/${boardName}`;

    await axios
      .get(url, {
        params: { page: 1, searchType: searchBy, keyword: searchTerm },
      })
      .then((response) => {
        // console.log("검색결과 1페이지(기본) 결과 검색");
        getData(
          response.data.content,
          response.data.totalPages,
          searchBy,
          searchTerm
        );

        navigate(
          `/${boardGroup}/${boardName}?page=${1}&searchType=${searchBy}&keyword=${searchTerm}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.searchBarContainer}>
      <select
        className={styles.searchBarDrowdown}
        value={searchBy}
        onChange={(event) => setSearchBy(event.target.value)}
      >
        <option value="titleOrContent">제목+내용</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="writer">작성자</option>
        <option value="location">장소</option>
      </select>
      <input
        className={styles.searchBarInput}
        type="text"
        placeholder="검색어를 입력해주세요"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>
      <button className={styles.searchBarInputBtn} onClick={onClick}>
        검색
      </button>
    </div>
  );
}

export default SearchBar;
