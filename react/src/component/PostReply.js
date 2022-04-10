import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "../plugins/axios";
import CommentList from "./CommentList"; //댓글
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import moment from "moment";
import useStore from "../plugins/store";
import styles from "../views/forget/FaqPost.module.css";

function PostReply({ reply }) {
  const [sendComment, setSendComment] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [comments, setComments] = useState(null);
  const [replyRecommendOrNot, setReplyRecommendOrNot] = useState(false);

  const location = useLocation();
  const idx = location.pathname.indexOf("/", 1);
  const idx2 = location.pathname.indexOf("/", idx + 1);
  const boardName = location.pathname.slice(idx + 1, idx2);

  const params = useParams();
  const postNo = params.postno;

  const store = useStore();
  const nickname =
    useStore.getState().nickname !== null
      ? useStore.getState().nickname
      : null;

  useEffect(() => {
    getReply(reply);
  }, [reply]);

  const getReply = function (reply) {
    reply.finduser3.map((like) => {
      if (like === nickname) {
        setReplyRecommendOrNot(true);
      }
    });
  };

  //댓글 수정
  const updateReply = async function (updatedComment, replyNo) {
    const formData = new FormData();
    formData.append("content", updatedComment);
    formData.append("nickname", nickname);

    await axios
      .put(`/${boardName}/${postNo}/reply/${replyNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        window.location.reload();
      });
  };

  //댓글 삭제
  const deleteReply = async function (replyNo) {
    await axios({
      method: "DELETE",
      url: `/${boardName}/${postNo}/reply/${replyNo}/${nickname}`,
    }).then(() => {
      // setComments(
      //   comments.filter((val) => {
      //     return val.replyNo !== replyNo;
      //   })
      // );
      window.location.reload();
    });
  };

  //추천 버튼 함수   //게시글 추천 //댓글 추천
  const addLike = async (type, targetNo, nickname) => {
    const formData = new FormData();
    formData.append("nickname", nickname);

    await axios
      .post(`/${boardName}/recomm/${type}/${targetNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        alert("추천하셨습니다");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //추천 삭제
  const deleteLike = async (type, targetNo, nickname) => {
    await axios
      .delete(`/${boardName}/recomm/${type}/${targetNo}/${nickname}`)
      .then((response) => {
        // console.log(response.data);
        alert("추천을 취소하셨습니다");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.comment} key={reply.id}>
      <div className={styles.commentNickname}>{reply.nickname}</div>
      {updateClicked === true ? (
        <CommentList
          sendComment={sendComment}
          updateReply={updateReply}
          reply={reply}
        />
      ) : (
        <div>{reply.replyContent}</div>
      )}
      <span className={styles.commentTime}>
        {reply.replyRegdate}
      </span>
      <span>
        {nickname === reply.nickname && (
          <div className={styles.commentAddBtnWrapper}>
            <button
              className={styles.commentAddBtn}
              onClick={() => {
                setUpdateClicked(!updateClicked);
              }}
            >
              {updateClicked ? "취소" : "수정"}
            </button>
            {updateClicked ? (
              <button
                className={styles.commentAddBtn}
                onClick={() => {
                  setSendComment(true);
                }}
              >
                수정
              </button>
            ) : (
              <button
                className={styles.commentAddBtn}
                onClick={() => {
                  deleteReply(reply.replyNo);
                }}
              >
                삭제
              </button>
            )}
          </div>
        )}
        {/* db에서 회원 댓글 추천 유무 확인 */}
        {nickname !== null ? (
          <div className={styles.replyRecommendContainer}>
            {replyRecommendOrNot ? (
              <AiFillHeart
                className={styles.replyRecommend}
                onClick={() => {
                  deleteLike("reply", reply.replyNo, nickname);
                  setReplyRecommendOrNot(false);
                }}
              />
            ) : (
              <AiOutlineHeart
                className={styles.replyNotRecommend}
                onClick={() => {
                  addLike("reply", reply.replyNo, nickname);
                  setReplyRecommendOrNot(true);
                }}
              />
            )}
          </div>
        ) : (
          <AiOutlineHeart
            className={styles.replyRecommend}
            onClick={() => {
              alert("로그인한 유저만 추천할 수 있습니다.");
            }}
          />
        )}
      </span>
    </div>
  );
}

export default PostReply;
