import React from "react";
import * as RiIcons from "react-icons/ri";

export const NavbarData = [
  {
    title: "스터디모집",
    path: "/together/study",
  },
  {
    title: "국비교육",
    path: "/reviewmain",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "기관검색",
        path: "/reviewmain",
      },
    ],
  },
  {
    title: "게시판",
    path: "/latestposts",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "리뷰게시판",
        path: "/mainboard/book",
      },
      {
        title: "고민상담게시판",
        path: "/mainboard/worry",
      },
      {
        title: "취업준비게시판",
        path: "/mainboard/career",
      },
      {
        title: "IT게시판",
        path: "/mainboard/technews",
      },
    ],
  },
  {
    title: "이벤트",
    path: "/jobfair",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "취업박람회 일정",
        path: "/jobfair",
      },
      {
        title: "재미로 하는 테스트",
        path: "/testmainpage",
      },
    ],
  },
  {
    title: "고객센터",
    path: "/customer/faq",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "공지사항",
        path: "/customer/notice",
      },
      {
        title: "자주하는 질문",
        path: "/customer/FAQ",
      },
    ],
  },
];
