import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "../../plugins/axios";
import * as Yup from "yup";
import styles from "./CreatePostCust.module.css";
import { useNavigate } from "react-router-dom";
import Preview from "../board/Preview";
import Refresh from "../Study/refresh.png"
import useStore from "../../plugins/store";
//Formik에서 필드 네임은 데이터베이스에 들어갈 이름임.

function CreatePostCust() {
    const store = useStore();
    const nickname =
        useStore.getState().nickname !== null
            ? useStore.getState().nickname
            : null;


    let navigate = useNavigate();

    //글 수정시 글 수정페이지로 넘어오면서 기존 글 정보로 initialValues를 초기화 해줘야되나?
    const initialValues = {
        boardName: "study",
        title: "",
        content: "",
        // nickname: localStorage.getItem("user"),
        nickname: "",
        category: [],
        file: null,
        interest: "",
        location: "",
        level: "",
        image: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("글 제목을 입력해주세요!"),
        content: Yup.string().required("본문 내용을 입력해주세요!"),
        location: Yup.string().required("필수선택"),
        interest: Yup.string().required("필수선택"),
        level: Yup.string().required("필수선택"),
        image: Yup.string().required("필수선택")

    });

    const submitPost = async function (values) {
        const { boardName, location, interest, level, title, content, image } =
            values;

        let categoryArr = [];

        if (location !== undefined) {
            categoryArr.push({ 장소: location });
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
            .post(`/${boardName}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // console.log(response.data);
                navigate("/together/study");
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
                        <label>게시판</label>
                        <Field as="select" name="boardName" className={styles.boardNameField}>
                            <option value="study">스터디모집</option>

                        </Field>
                        <div>
                            <div>

                                <label>카테고리 :</label>
                                <span className={styles.clearCate}>
                                    <button
                                        className={styles.cateButton}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setFieldValue("location", "", false);
                                            setFieldValue("interest", "", false);
                                            setFieldValue("level", "", false);
                                        }}
                                    >
                                        초기화 <img className={styles.refresh} src={Refresh} />
                                    </button>

                                </span>
                            </div>

                            <div className={styles.categorySelect}>

                                <Field
                                    as="select"
                                    name="location"
                                    className={styles.categoryField}
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
                        <label>글 제목 : </label>
                        <ErrorMessage
                            name="title"
                            component="span"
                            className={styles.createPostErr}
                        />
                        <Field autocomplete="off" className={styles.titleField} name="title" />
                        <label>본문 : </label>
                        <ErrorMessage
                            name="content"
                            component="span"
                            className={styles.createPostErr}
                        />
                        <Field
                            autocomplete="off"
                            name="content"
                            component="textarea"
                            placeholder=" 
                            내용 예시:
                            상세주소: 00동 스타벅스
                            공부상제주제: 스프링시큐리티 로그인
                            참여인원: 5명
                            추가내용: __"
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

                        />

                        <div className={styles.previewImg}>
                            {" "}
                            {values.image && <Preview image={values.image} />}
                        </div>
                        <div>
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
                        </div>
                        <div className={styles.postSubmitBtnWrapper}>
                            <button className={styles.postSubmitBtn} type="submit">
                                작성완료
                            </button>

                            {/* 작성취소 버튼은 기능 구현 해야함. */}
                            <button
                                className={styles.postSubmitBtn2}
                                type="button"
                                onClick={() => {
                                    //글 작성을 취소하시겠습니까?
                                    navigate(-1); //뒤로가기
                                }}
                            >
                                작성취소
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default CreatePostCust;
