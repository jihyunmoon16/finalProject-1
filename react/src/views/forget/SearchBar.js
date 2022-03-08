import { useState } from "react";
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import React from "react";
import "../board/SearchBar.css";
import axios from '../../plugins/axios';

function SearchBar({ getData }) {

  const navigate = useNavigate();
  const location = useLocation();

  const [searchBy, setSearchBy] = useState("titleOrContent"); //초기값은 드롭박스 처음 값으로 설정.
  const [searchTerm, setSearchTerm] = useState("");

  const onClick = () => {
    console.log("자식컴포넌트 ", searchBy, searchTerm);

    searchList(searchBy, searchTerm);


  }

  const searchList = async function (searchBy, searchTerm) {

    let url = location.pathname;// /faq


    await axios.get(url, { params: { page: 1, searchType: searchBy, keyword: searchTerm } })
      .then((response) => {

        console.log("검색결과 1페이지(기본) 결과 검색")
        getData(response.data.content, response.data.totalPages, searchBy, searchTerm);

        navigate(`${url}?page=${1}&searchType=${searchBy}&keyword=${searchTerm}`);
      })
      .catch((error) => { console.log(error) });
  }

  return (
    <div className="searchBarContainer">
      {/* option의 value는 서버에 보내질 값 */}
      <select
        className="searchBarDrowdown"
        value={searchBy}
        onChange={(event) => setSearchBy(event.target.value)}
      >
        <option value="titleOrContent">제목+내용</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="writer">작성자</option>
      </select>
      <input
        className="searchBarInput"
        type="text"
        placeholder="검색어를 입력해주세요"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>
      <button className="searchBarInputBtn" onClick={onClick}>검색</button>

    </div>
  );
}

export default SearchBar;
