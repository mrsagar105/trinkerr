import React from "react";
import styled from "styled-components";

function Navbar() {
  return (
    <NavbarContainer>
      <img src="images/logo.svg" alt="" />
    </NavbarContainer>
  );
}

export default Navbar;

const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #eee;
`;
