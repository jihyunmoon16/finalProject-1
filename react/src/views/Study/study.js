import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import {
    Link,
    useNavigate,
    useLocation,
    useParams,
    useSearchParams,
} from "react-router-dom";
import axios from "../../plugins/axios";
import styles from "../Study/Studymain.module.css";
import SearchBar from "../forget/SearchBar";
import CareerBoardTable from "../../component/CareerBoardTable";
import useStore from "../../plugins/store";
function Study(props) {
    const store = useStore();
    const isLogin = useStore((state) => state.isLogin);
    const nickname =
        useStore.getState().nickname !== null
            ? useStore.getState().nickname
            : null;


    const baseUrl = useStore((state) => state.url);


    const navigate = useNavigate();
    const location = useLocation();

    // console.log(location);
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
    // const [pageNo, setPageNo] = useState(1);

    const [searchType, setSearchType] = useState("");
    const [keyword, setKeyword] = useState("");

    const [paginationNumber, setPaginationNumber] = useState(0);

    useEffect(() => {
        page = page === null ? 1 : page;
        qType = qType === null ? "" : qType;
        qWord = qWord === null ? "" : qWord;
        qOrder = qOrder === null ? "" : qOrder;

        getStudy(boardName, page, qType, qWord, qOrder);

        setPaginationNumber(parseInt(page));
    }, [page, qType, qWord, qOrder]);

    const changePage = ({ selected }) => {
        getStudy(boardName, selected + 1, qType, qWord, qOrder);
    };

    //리액트화면에서 검색결과 창에서 x버튼 누르면 타입과 검색처 초기화?
    async function getStudy(boardName, page, searchType, keyword, order = "postRegdate") {
        let url = `/${boardName}`;

        await axios
            .get(url, {
                params: { page: page, searchType: searchType, keyword: keyword, order: order },
            })
            .then((response) => {
                // console.log(response.data)
                const postList = response.data.content;
                // const postCate = response.data.content[2];
                // const postCate2 = postCate.category;
                // const postCate3 = postCate2[0].categoryName;
                // console.log(postCate3);


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
                    `/${boardGroup}/${boardName}?page=${page}&searchType=${searchType}&keyword=${keyword}&order=${order}`
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

    const getData = (posts, pageCount, searchType, keyword) => {
        setPosts(posts);
        setPageCount(pageCount);
        setSearchType(searchType);
        setKeyword(keyword);
    };
    // const mapR= {posts.map((posts2, i)=>
    //     {posts2.map((post3, i)=>
    //         {post3.categoryName}
    //         )}
    //     )}

    // const [filter, setFilter] = useState(posts)
    // const filterResult = (인천) => {
    //     const postLists = posts[2];
    //     const postCates = postLists.category;
    //     const postCates2 = postCates[0].categoryName;
    //     console.log(postCates2)
    //     const result2 = postCates.filter((curData) => {

    //         return curData.categoryName !== 인천;
    //     })
    //     setFilter(result2)

    // }

    return (
        <div className={styles.boardContainer}>
            {/* <button onClick={() => filterResult("인천")}>인천</button> */}
            <div className={styles.main2}>
                {posts.map((post, i) => (
                    <div key={i} className={styles.main}>
                        <div className={styles.Card}>
                            <button className={styles.life}>
                                <Link to={`${post.postNo}`} className={styles.postTableTitle}>
                                    {post.image.map((image, i) =>
                                        <div key={i}>
                                            <img className={styles.miss} src={`${baseUrl}/get/image/${image.filename}`} width="20%" alt="이미지" />
                                            <div className={styles.bottom22}>
                                                <div className={styles.postTitle2}>{post.postTitle}</div>
                                                {post.category.map((category, i) => (
                                                    <div className={styles.cateText} key={i}>
                                                        <div></div>{category.categoryKind}:{category.categoryKind.location}{category.categoryKind.level}
                                                        {category.categoryName}
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    )}
                                </Link>
                            </button>
                        </div>
                    </div >
                ))}
            </div>
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

                <SearchBar getData={getData} getPost={getStudy} />
                {isLogin ? (

                    <div className={styles.writePostBtnWrapper}>
                        <button
                            onClick={() => {
                                navigate(`/${boardGroup}/${boardName}/create`);
                            }}
                            className={styles.writePostBtn}
                        >
                            글쓰기
                        </button>
                    </div>
                ) : null}
            </div>


        </div>
    );
}
export default Study;
