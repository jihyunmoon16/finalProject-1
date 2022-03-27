import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import useStore from "../../plugins/store";


function Study() {

    const [posts, setPosts] = useState([]);
    const baseUrl = useStore((state) => state.url);

    useEffect(() => {

        axios.get("/study")
            .then((response) => {
                setPosts(response.data);
                // console.log(response.data);

            })


            .catch((error) => {
                console.error(error);
            })

    }, []);
    return (

        <div className="StudyMain">
            <div className="SubStudy">
                <h3>스터디 모집</h3>
                <hr />
                <div className='container'>
                    <div className='row'>
                        {posts.map((post, i) => (
                            <div key={i} className='main'>
                                <div className='Card'>
                                    {/* {post.category,map((category,i)=>(
                                      
                                    ))} */}
                                    <button>
                                        <h3>기관검색</h3>
                                        <div>{post.postTitle}</div>
                                        <div>{post.board.boardWriter}</div>
                                        {post.image.map((image, i) =>
                                            <img src={`${baseUrl}/get/image/${image.name}`} width="10%" alt="이미지" />
                                        )}
                                        {/* < h3 > 사용언어 : {data[0].uselanguage}</h3> */}
                                    </button>
                                </div>
                            </div >
                        ))}
                    </div>
                </div>

                <button> <Link to="/studytext">모집글작성</Link></button>
            </div>
        </div>
    )

} export default Study;
