import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
  useParams,
} from "react-router-dom";
import axios from "../../plugins/axios";
import styles from "../unifiedSearch/UnifiedSearch.module.css";
import useStore from "../../plugins/store";
import BoardOption from "./BoardOption";

function UnifiedSearch() {
  const store = useStore();
  const searchWord = store.getSearchWord();

  const navigate = useNavigate();
  const location = useLocation();

  // const params = useParams();
  // const boardNameUrl = params.boardname;
  // console.log("boardNameUrl", boardNameUrl);
  const idx = location.pathname.indexOf("/", 1);
  // console.log(idx);
  const boardGroup = location.pathname.slice(1, idx);
  const boardName = location.pathname.slice(idx + 1);


  const [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");
  let qType = searchParams.get("searchType");
  let qWord = searchParams.get("keyword");
  let qOrder = searchParams.get("order");

  const [postInfo, setPostInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  // const [searchType, setSearchType] = useState("");
  // const [keyword, setKeyword] = useState("");

  const [paginationNumber, setPaginationNumber] = useState(0);

  useEffect(() => {
    page = page === null ? 1 : page;
    qType = qType === null ? "titleOrContent" : qType;
    qWord = qWord === null ? searchWord : qWord;
    qOrder = qOrder === null ? "" : qOrder;

    getUnifiedPost(boardName, page, qType, qWord, qOrder);

    setPaginationNumber(parseInt(page));
  }, [page, qType, qWord, qOrder]);

  const changePage = ({ selected }) => {
    getUnifiedPost(boardName, selected + 1, qType, qWord, qOrder);
  };

  const addOrder = (e) => {
    // console.log(e.target.value);
    getUnifiedPost(boardName, page, qType, qWord, e.target.value);
  };
  const changeBoard = () => {
    navigate(`/unified/${boardName}?page=${1}&searchType=${qType}&keyword=${qWord}&order=${qOrder}`)
  };

  //리액트화면에서 검색결과 창에서 x버튼 누르면 타입과 검색처 초기화?
  async function getUnifiedPost(boardName, page, searchType, keyword, order = "postRegdate") {
    let url = `/unified/${boardName}`;
    // console.log(boardName);
    await axios
      .get(url, {
        params: {
          page: page,
          searchType: searchType,
          keyword: keyword,
          order: order,
        },
      })
      .then((response) => {
        const postList = response.data.content;
        for (const post of postList) {
          //작성시간 변환
          const date = new Date(post.postRegdate);
          post.postRegdate = dateFormat(date);


          if (post.board.boardName === "study") {
            post.Grouping = "together"
          } else if (post.board.boardName === "career") {
            post.Grouping = "mainboard"
          } else if (post.board.boardName === "book") {
            post.Grouping = "mainboard"
          } else if (post.board.boardName === "worry") {
            post.Grouping = "mainboard"
          } else if (post.board.boardName === "notice") {
            post.Grouping = "customer"
          } else if (post.board.boardName === "faq") {
            post.Grouping = "customer"
          }



        }
        //업데이트
        setPostInfo(response.data);
        setPosts(postList);
        // console.log(postList);
        setPageCount(response.data.totalPages);

        navigate(
          `/unified/${boardName}?page=${page}&searchType=${searchType}&keyword=${keyword}&order=${order}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
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

  return (
    <div className={styles.boardContainer}>
      <h1 className={styles.heading}> <span className={styles.searchWord}>'{searchWord}'</span> 검색결과</h1>

      <div className={styles.orderButtons}>
        <BoardOption getUnifiedPost={getUnifiedPost} />
        <div>
          <button value="postRegdate" onClick={addOrder}>
            최신순
          </button>
          <button value="postViews" onClick={addOrder}>
            조회순
          </button>
          <button value="postLike" onClick={addOrder}>
            추천순
          </button>
          <button value="replyCount" onClick={addOrder}>
            댓글순
          </button>
        </div>
      </div>

      <table className={styles.faqTable}>
        <thead>
          <tr>
            <th className={styles.wNo}>번호</th>
            <th className={styles.wNo}>게시판</th>
            <th className={styles.wTitle}>제목</th>
            <th className={styles.wAuthor}>작성자</th>
            <th className={styles.wLike}>추천수</th>
            <th className={styles.wView}>조회수</th>
            <th className={styles.wDate}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.postNo}>
              <td>{post.postNo}</td>
              <td>{post.korBoardName}</td>
              <td className={styles.tableTitle}>
                <Link to={`/${post.Grouping}/${post.board.boardName}/${post.postNo}`} className={styles.postTableTitle}>
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

      <div className={styles.paginateContainer}>
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          pageCount={pageCount}
          forcePage={paginationNumber - 1}
          onPageChange={changePage}
          containerClassName={styles.paginationBttns}
          previousLinkClassName={styles.previousBttn}
          nextLinkClassName={styles.nextBttn}
          disabledClassName={styles.paginationDisabled}
          activeClassName={styles.paginationActive}
        />
      </div>

    </div>
  );
}
export default UnifiedSearch;
