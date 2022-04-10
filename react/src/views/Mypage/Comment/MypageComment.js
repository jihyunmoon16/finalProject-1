import React, { useEffect, useState, navigate } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import axios from "../../../plugins/axios";
import "./MypageComment.css";
import useStore from "../../../plugins/store";
import moment from "moment"; //날짜 수정하기 위해 모멘트 설치
import CommentList from "./CommentList"; //댓글 수정하면 나오는 입력창

import ReactPaginate from "react-paginate";
import SearchBar from "./MypageSearchBar";
import styles from "./MypageComment.module.css";

function ReviewComment() {

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");
  let qType = searchParams.get("searchType");
  let qWord = searchParams.get("keyword");
  let qOrder = searchParams.get("order");

  const [postInfo, setPostInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");


  const [paginationNumber, setPaginationNumber] = useState(0);

  const nickname =
    useStore.getState().nickname !== null
      ? useStore.getState().nickname
      : null;

  const [postObject, setPostObject] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [updateClicked, setUpdateClicked] = useState(false);
  const [sendComment, setSendComment] = useState(false);

  useEffect(() => {
    page = page === null ? 1 : page;
    qType = qType === null ? "" : qType;
    qWord = qWord === null ? "" : qWord;
    qOrder = qOrder === null ? "" : qOrder;

    getPost(page, qType, qWord, qOrder);

    setPaginationNumber(parseInt(page));
  }, [page, qType, qWord, qOrder]);

  const changePage = ({ selected }) => {
    getPost(selected + 1, qType, qWord, qOrder);
  };

  const addOrder = (e) => {
    // console.log(e.target.value);
    getPost(page, qType, qWord, e.target.value);
  };


  const getPost = async function (page, searchType, keyword, order = "replyRegdate") {
    let url = `/mypage/reply/${nickname}`;
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
        const replyList = response.data.content;
        for (const reply of replyList) {
          //작성시간 변환
          const date = new Date(reply.replyRegdate);
          reply.replyRegdate = dateFormat(date);
          // console.log(date);
          // console.log(reply);

          if (reply.boardName === "review") {
            reply.boardName = "리뷰게시판"
          } else if (reply.boardName === "career") {
            reply.boardName = "취업준비게시판"
          } else if (reply.boardName === "book") {
            reply.boardName = "리뷰게시판"
          } else if (reply.boardName === "worry") {
            reply.boardName = "고민상담게시판"
          }
        }
        //업데이트
        setPostInfo(response.data);
        setPosts(replyList);
        // console.log(replyList);
        setPageCount(response.data.totalPages);

        navigate(
          `/mypage/MypageComment/?page=${page}&searchType=${searchType}&keyword=${keyword}&order=${order}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const getData = (posts, pageCount, searchType, keyword) => {
    //검색버튼 누르면 검색결과 1페이지 리스트랑 페이지정보 넘어옴.
    // console.log(posts, pageCount, searchType, keyword);
    setPosts(posts);
    setPageCount(pageCount);
    setSearchType(searchType);
    setKeyword(keyword);
  };








  return (
    <div className={styles.boardContainer}>
      <h1 className={styles.heading}>내가 쓴 댓글</h1>
      <div className={styles.orderButtons}>

        <button value="replyLike" onClick={addOrder}>
          추천순
        </button>

      </div>

      <table className={styles.faqTable}>
        <thead>
          <tr>
            <th className={styles.wNo}>번호</th>
            <th className={styles.wTitle}>작성글</th>
            <th className={styles.wBoardName}>작성게시판</th>
            <th className={styles.wLike}>추천수</th>
            <th className={styles.wDate}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr>
              <td>{post.postNo}</td>
              <td>{post.replyContent}</td>
              <td className={styles.tableTitle}>
                {post.boardName}
                {post.replyCount > 0 && <span>[{post.replyCount}]</span>}
              </td>
              <td>{post.replyLike}</td>
              <td>{post.replyRegdate}</td>
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

      <div>
        <SearchBar getData={getData} nickname={nickname} />

      </div>

    </div>
  );
}

export default ReviewComment;
