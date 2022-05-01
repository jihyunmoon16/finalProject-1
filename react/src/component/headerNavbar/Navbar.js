import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../plugins/store";
import styled from "styled-components";
import { NavbarData } from "./NavbarData";
import NavbarMenu from "./NavbarMenu";
import { IconContext } from "react-icons/lib";
import searchIcon from "../../assets/search.png";

const NavbarSide = styled.nav`
  background: var(--colorNavyDark);
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2rem;
  position: fixed;
  top: 4rem;
  right: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const NavbarWrap = styled.div`
  width: 100%;
`;

const Searchbar = styled.div`
  background-color: white;
  height: 40px;
  display: grid;
  grid-template-columns: 1.8fr 0.2fr;
  border-radius: 5px;
  align-items: center;
  width: 80%;
  border: 1px solid #eee;
  margin-bottom: 1rem;
`;

const SearchIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Input = styled.input`
  border: none;
`;

const Navbar = (props) => {
  const store = useStore();
  let navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const goUniSearch = () => {
    store.setSearchWord(searchWord);
    navigate(
      `/unified/all?page=1&searchType=titleOrContent&keyword=${searchWord}&order=`
    );
  };
  const keyUpSearch = (e) => {
    if (e.key === "Enter") {
      goUniSearch();
    }
  };

  // props.props가 부모 컴포넌트에서 창 열고/닫기 버튼 누르는 
  // 상태를 가져온거고, 만약 사이트 메뉴창이 열려있으면
  // scroll disable 해주는 걸 useEffect에 넣어줌. 
  useEffect(() => {
    if (props.props) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    console.log(props.props);
  }, [props.props]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <NavbarSide sidebar={props.props}>
          <Searchbar>
            <SearchIconContainer>
              <Input
                onChange={(event) => {
                  const word = event.target.value;
                  const replaced = word.replace(/(\s*)/g, "");
                  setSearchWord(replaced);
                }}
                onKeyUp={keyUpSearch}
              ></Input>
              <img src={searchIcon} alt="" onClick={goUniSearch}></img>
            </SearchIconContainer>
          </Searchbar>
          <NavbarWrap>
            {NavbarData.map((item, index) => {
              return <NavbarMenu item={item} key={index} />;
            })}
          </NavbarWrap>
        </NavbarSide>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
