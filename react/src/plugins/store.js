import create from 'zustand'
import axios from "../plugins/axios";
import jwt_decode from 'jwt-decode'
import { Link, useNavigate } from "react-router-dom";
import { persist } from "zustand/middleware"

//로컬스토리지 저장. 리프레쉬토큰 , 액세스 토큰
const useStore = create(persist(
    (set, get) => ({
        member: null,
        isLogin: false,
        url: "http://localhost:8000",

        continueLogin: async (accessToken, refreshToken) => {

            const dt = jwt_decode(accessToken);
            const nickname = dt.member.nickname;

            try {

                const formData = new FormData();
                formData.append("nickname", nickname);
                formData.append("refreshToken", refreshToken);

                const response = await axios.post(`/api/refresh`, formData);

                localStorage.setItem("accessToken", response.data);

                const newToken = response.data;
                const de = jwt_decode(newToken);

                get().setMemberInfo(de.member);

            } catch (err) {
                console.log(err);
                get().logout();

            }

        },
        setMemberInfo: (member) => {
            set({ member: member, isLogin: true });
            console.log("after login => member:", get().member, get().member.nickname);
        },
        getMemberInfo: () => {
            if (get().member !== null) {
                return get().member;
            }
        },
        getMemberRole: () => {
            if (get().member !== null) {
                return get().member.authorities[0].authority;// "ROLE_USER"
            }
        },
        logout: () => {
            localStorage.clear();
            set({
                member: null,
                isLogin: false,
            });
            console.log("after logout => member:", get().member);
        },
    }),
    {
        name: "info-storage", // unique name
        getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
))


export default useStore;