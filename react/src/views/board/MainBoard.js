import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../../component/SideNavbar";
// Data File
import { MainboardData } from "../../component/MainboardData";

function MainBoard() {
  return (
    <div>
      <div>
        <SideNavbar data={MainboardData} title="게시판" />
        <Outlet />
      </div>
    </div>
  );
}

export default MainBoard;
