import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "../../plugins/axios";
import * as Yup from "yup";
import styles from "./UpdatePostCus.module.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Preview from "../board/Preview";

function UpdateCusPost(tableData) {
  const params = useParams();
  const postNo = params.postno;
  const location = useLocation();
  let navigate = useNavigate();

  const [boardName, setBoardName] = useState("study");
  const [title, setTitle] = useState("");
  const [content, setContet] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const [locationCate, setLocationCate] = useState("");
  const [interestCate, setInterestCate] = useState("");
  const [levelCate, setLevelCate] = useState("");

  console.log(boardName);
  console.log(title);
  console.log(content);
  console.log(nickname);
  //글 수정시 글 수정페이지로 넘어오면서 기존 글 정보로 initialValues를 초기화 해줘야되나?
  let initialValues = {
    boardName: boardName,
    title: title,
    content: content,
    nickname: nickname,
    category: [],
    location: undefined,
    interest: undefined,
    level: undefined,
    image: "",
    file: null,
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("글 제목을 입력해주세요!"),
    content: Yup.string().required("본문 내용을 입력해주세요!"),
    location: Yup.string().required("필수선택"),
    interest: Yup.string().required("필수선택"),
    level: Yup.string().required("필수선택"),
    image: Yup.string().required("필수선택")

  });
  useEffect(() => {
    const idx = location.pathname.indexOf("/", 1);
    const idx2 = location.pathname.indexOf("/", idx + 1);
    const idx3 = location.pathname.indexOf("/", idx2 + 1);
    const boardGroup = location.pathname.slice(1, idx);
    const boardName = location.pathname.slice(idx + 1, idx2);
    const postNum = location.pathname.slice(idx2 + 1, idx3);
    console.log(idx);
    console.log(idx2);
    console.log(boardGroup);
    console.log(boardName);

    getPost(boardName, postNum);
  }, []);

  const getPost = function (boardName, postNo) {
    axios
      .get(`/${boardName}/${postNo}`)
      .then((response) => {
        const post = response.data;
        post.postRegdate = dateFormat(new Date(post.postRegdate));

        for (const reply of post.replies) {
          reply.replyRegdate = dateFormat(new Date(reply.replyRegdate));
        }

        console.log(post);
        setBoardName(boardName);
        setTitle(post.postTitle);
        setContet(post.postContent.content);
        setNickname(post.nickname);
        setImage(post.filename[0].filename)

        console.log(post.filename[0].filename)
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



  const submitPost = async function (values) {
    const { boardName, location, interest, level, title, content, image } =
      values;

    let categoryArr = [];

    if (location !== undefined) {
      categoryArr.push({ location: location });
    }
    if (interest !== undefined) {
      categoryArr.push({ interest: interest });
    }
    if (level !== undefined) {
      categoryArr.push({ level: level });
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    //나중에 데이터값 받아와서 수정
    formData.append("nickname", nickname);
    formData.append("category", JSON.stringify(categoryArr));

    if (image !== undefined) {
      formData.append("file", image);
    }

    await axios
      .put(`/${boardName}/${postNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(-2)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fileRef = useRef(null);
  const {
    category
  } = tableData;
  return (
    //글 등록 게시판 카테고리 드롭박스
    // 게시글 카테고리 드롭박스
    <div className={styles.createPost}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={submitPost}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.createPostformContainer}>
            <label className={styles.heading}>등록할 게시판 고르기 </label>
            <Field
              as="select"
              name="boardName"
              className={styles.boardNameField}
            >
              <option value="study">스터디모집</option>

            </Field>
            <div>
              <label>카테고리</label>
              <span className={styles.clearCate}>
                <button
                  className={styles.postBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    setFieldValue("location", "", false);
                    setFieldValue("interest", "", false);
                    setFieldValue("level", "", false);
                  }}
                >
                  카테고리 초기화
                </button>
              </span>
              <div className={styles.categorySelect}>
                <Field
                  as="select"
                  name="location"
                  className={styles.categoryField}
                  defaultValue={""}
                >
                  <option value="" disabled>
                    지역
                  </option>
                  <option value="서울">서울</option>
                  <option value="부산">부산</option>
                  <option value="대구">대구</option>
                  <option value="인천">인천</option>
                  <option value="광주">광주</option>
                  <option value="대전">대전</option>
                  <option value="울산">울산</option>
                  <option value="세종">세종</option>
                  <option value="경기">경기</option>
                  <option value="강원">강원</option>
                  <option value="충북">충북</option>
                  <option value="충남">충남</option>
                  <option value="전북">전북</option>
                  <option value="전남">전남</option>
                  <option value="경북">경북</option>
                  <option value="경남">경남</option>
                  <option value="제주">제주</option>
                </Field>

                <Field
                  as="select"
                  name="interest"
                  className={styles.categoryField}
                  defaultValue={""}
                >
                  <option value="" disabled>
                    분야
                  </option>
                  <option value="프론트엔드">프론트엔드</option>
                  <option value="백엔드">백엔드</option>
                  <option value="풀스택">풀스택</option>
                </Field>
                <Field
                  as="select"
                  name="level"
                  className={styles.categoryField}
                  defaultValue={""}
                >
                  <option value="" disabled>
                    수준
                  </option>
                  <option value="초보">초보</option>
                  <option value="중수">중수</option>
                  <option value="고수">고수</option>
                </Field>

              </div>
              <div className="createPostErr2">
                <ErrorMessage
                  name="location"
                  component="div"
                  className={styles.createPostErr3}
                />


                <ErrorMessage
                  name="interest"
                  component="div"
                  className={styles.createPostErr4}
                />

                <ErrorMessage
                  name="level"
                  component="div"
                  className={styles.createPostErr5}
                />
              </div>
            </div>
            <div>&nbsp;</div>
            <label>글 제목: </label>
            <ErrorMessage
              name="title"
              component="span"
              className={styles.createPostErr}
            />
            <Field autocomplete="off" className={styles.titleField} name="title" />
            <label>본문: </label>
            <ErrorMessage
              name="content"
              component="span"
              className={styles.createPostErr}
            />
            <Field
              autocomplete="off"
              name="content"
              component="textarea"
              placeholder="글 내용과 주로 사용하는 언어 및 기타 내용을 적어주세요"
              className={styles.bodyField}
            />

            <input
              ref={fileRef}

              id="image"
              name="image"
              type="file"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              className={styles.formControl}
            />

            <div className={styles.previewImg}>
              {values.image && <Preview image={values.image} />}
            </div>
            <div className={styles.ImageButtons}>
              <input
                className={styles.previewButton}
                type="button"
                onClick={() => {
                  fileRef.current.click();
                }}
                value="사진"
              />
              <button className={styles.resetButton}
                type="button"
                onClick={() => {
                  setFieldValue("image", "", false);

                }}
              >
                초기화
              </button>
            </div>
            <ErrorMessage
              name="image"
              component="span"
              className={styles.createPostErr}
            />
            <div className={styles.postBtnWrapper}>
              <button
                className={styles.postBtn}
                type="button"
                onClick={() => {
                  //글 작성을 취소하시겠습니까?
                  navigate(-1); //뒤로가기
                }}
              >
                작성취소
              </button>
              <button className={styles.postBtn} type="submit">
                작성완료
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
}

export default UpdateCusPost;
