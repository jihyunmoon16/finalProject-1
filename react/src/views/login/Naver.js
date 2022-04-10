import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation, useSearchParams, Navigate } from "react-router-dom";
import axios from "../../plugins/axios";
import useStore from "../../plugins/store";
import jwt_decode from "jwt-decode";

// /oauth/redirect
const Naver = () => {
    const store = useStore();

    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    useEffect(() => {
        // 컴포넌트 렌더링이 되었을 때, 쿼리스트링으로부터 토큰을 획득
        // 토큰이 존재하는 경우, Store에 토큰을 저장한다.
        // 토큰이 있던 없던, 루트 페이지로 이동
        getToken();

        navigate("/"); // +replace 
    }, []);

    const getToken = async () => {

        const dt = jwt_decode(accessToken);
        store.setMemberInfo(dt.nickname, dt.role);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

    };

    return null;
};

export default Naver;