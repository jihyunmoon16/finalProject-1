import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import styles from "./BoardOption.module.css";
import axios from "../../plugins/axios";
import useStore from "../../plugins/store";
import { AiOutlineCaretDown } from "react-icons/ai";

function BoardOption({ getUnifiedPost }) {

    const serachWord = useStore((state) => state.serachWord);
    // const [boardOption, setBoardOption] = useState("all"); //초기값은 드롭박스 처음 값으로 설정.

    return (
        <div className={styles.searchBarContainer}>
            <select
                className={styles.searchBarDrowdown}
                // value={boardOption}
                onChange={(event) => {
                    // setBoardOption(event.target.value);
                    // console.log(event.target.value);
                    getUnifiedPost(event.target.value, 1, "titleOrContent", serachWord, "postRegdate")
                }}

            >
                <option value="all" >전체</option>
                <option value="study" >스터디모집</option>
                <option value="worry" >고민상담</option>
                <option value="career" >취업준비</option>
                <option value="book" >리뷰</option>
                <option value="notice" >공지사항</option>
            </select>
            <AiOutlineCaretDown />

        </div>
    );
}

export default BoardOption;
