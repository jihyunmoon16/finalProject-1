import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "../../plugins/axios";
import * as Yup from "yup";
import styles from "./CreatePost.module.css";
import { useNavigate } from "react-router-dom";
import Preview from "./Preview";
import useStore from "../../plugins/store";

function CreatePost() {
  const nicknameInfo = useStore((state) => state.nickname);
  let navigate = useNavigate();

  //글 수정시 글 수정페이지로 넘어오면서 기존 글 정보로 initialValues를 초기화 해줘야되나?
  const initialValues = {
    boardName: "book",
    title: "",
    content: "",
    nickname: "",
    category: [],
    file: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("글 제목을 입력해주세요!"),
    content: Yup.string().required("본문 내용을 입력해주세요!"),
  });

  const submitPost = async function (values) {
    const {
      boardName,
      location,
      interest,
      level,
      title,
      content,
      image,
      nickname,
    } = values;

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
    formData.append("nickname", nicknameInfo);
    formData.append("category", JSON.stringify(categoryArr));

    if (image !== undefined) {
      formData.append("file", image);
    }

    await axios
      .post(`/${boardName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fileRef = useRef(null);

  return (
    //글 등록 게시판 카테고리 드롭박스
    // 게시글 카테고리 드롭박스
    <div className={styles.createPost}>
      <Formik
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
              {/* <option value="study">스터디모집</option>
              <option value="edu">국비교육</option> */}
              <option value="book">리뷰게시판</option>
              <option value="worry">고민상담</option>
              <option value="career">취업준비</option>
              {/* <option value="news">IT뉴스</option> */}
              {/* <option value="event">이벤트</option> */}
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
                {/* <Field as="select" name="language" className="categoryField">
                  <option value="" disabled selected>사용하는 언어</option>
                  <option value="C">C</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Kotlin">Kotlin</option>
                  <option value="Swift">Swift</option>
                  <option value="Go">Go</option>
                  <option value="Rust">Rust</option>
                </Field> */}
              </div>
            </div>

            <label>글 제목: </label>
            <ErrorMessage
              name="title"
              component="span"
              className={styles.createPostErr}
            />
            <Field
              autocomplete="off"
              className={styles.titleField}
              name="title"
              placeholder="제목을 작성해주세요"
            />
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
              placeholder="내용을 작성해주세요"
              className={styles.bodyField}
            />

            <input
              ref={fileRef}
              hidden
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
            <input
              className={styles.previewButton}
              type="button"
              onClick={() => {
                fileRef.current.click();
              }}
              value="사진"
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
    </div>
  );
}

export default CreatePost;
