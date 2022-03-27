import React, { useEffect, useState } from "react";
// import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import "./CareerBoard.css";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "../../plugins/axios";
import SearchBar from "./SearchBar";
// import moment from "moment";

function CareerBoard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");
  let qType = searchParams.get("searchType");
  let qWord = searchParams.get("keyword");

  const [postInfo, setPostInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    page = page === null ? 1 : page;
    qType = qType === null ? "" : qType;
    qWord = qWord === null ? "" : qWord;

    getFaq(page, qType, qWord);
  }, [page, qType, qWord]);

  const changePage = ({ selected }) => {
    getFaq(selected + 1, qType, qWord);
  };

  async function getFaq(page, searchType, keyword) {
    let url = "/career";

    await axios
      .get(url, {
        params: { page: page, searchType: searchType, keyword: keyword },
      })
      .then((response) => {
        const postList = response.data.content;

        for (const post of postList) {
          //작성시간 변환
          const date = new Date(post.postRegdate);
          post.postRegdate = dateFormat(date);
        }
        //업데이트
        setPostInfo(response.data);
        setPosts(postList);
        setPageCount(response.data.totalPages);

        navigate(
          `${url}?page=${page}&searchType=${searchType}&keyword=${keyword}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const getPost = async function () {
  //   await axios
  //     .get("/career/{postno}") // 50번글 조회
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    hour = hour >= 10 ? hour : "0" + hour;
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;

    return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  //현재 페이지 정보
  // const [pageNumber, setPageNumber] = useState(0);

  // const postsPerPage = 10;

  //현재 몇개 포스트를 봤는지 그 시작점을 알려줌. (나중에 슬라이스 할때 사용)
  // const pagesVisited = pageNumber * postsPerPage;

  // const pageCount = Math.ceil(posts.length / postsPerPage);

  // const changePage = ({ selected }) => {
  //   setPageNumber(selected);
  // };

  // const handleSearch = (searchType, keyword) => {
  //   axios
  //     .get("/career/list/search", {
  //       params: { searchType, keyword },
  //     })
  //     .then((response) => setPosts(response.data || []))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   axios
  //     .get("/career/list")
  //     .then((response) => {
  //       setPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => setReversedPosts(posts.reverse()), [posts]);

  const getData = (posts, pageCount, searchType, keyword) => {
    //검색버튼 누르면 검색결과 1페이지 리스트랑 페이지정보 넘어옴.
    // console.log(posts, pageCount, searchType, keyword);
    setPosts(posts);
    setPageCount(pageCount);
    setSearchType(searchType);
    setKeyword(keyword);
  };

  return (
    <div className="boardContainer">
      <div className="careerBoardTitle">취업상담게시판</div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>추천수</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>

        <tbody className="nice">
          {posts.map((post) => (
            <tr>
              <td>{post.postNo}</td>
              <td className="table-title">
                <Link to={`/career/post/${post.postNo}`}>
                  {post.postTitle}
                </Link>
                {post.replyCount > 0 && <span>[{post.replyCount}]</span>}
              </td>
              <td>{post.nickname}</td>
              <td>{post.postLike}</td>
              <td>{post.postViews}</td>
              <td>{post.postRegdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
        <div className="careerBoardSearchWrapper">
          <SearchBar getData={getData} />
          <button
            onClick={() => {
              if (
                //벡엔드 연결되면 필요한 부분 수정
                localStorage.getItem("user")
              ) {
                window.location.href = "/mainboard/createpost";
              } else {
                alert("로그인해주세요");
              }
            }}
            className="createPostBtn"
          >
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CareerBoard;
