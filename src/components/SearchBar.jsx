import React from "react";
import styled from "styled-components";

function SearchBar({ search, setSearch }) {
  return (
    <SearchContainer>
      <input
        type="text"
        placeholder="Search stocks..."
        valus={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchContainer>
  );
}

export default SearchBar;

const SearchContainer = styled.div`
  width: 500px;
  padding: 20px;

  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 2px solid #e9e9e9;
    outline: none;

    &:focus {
      border: 2px solid #9ed3ff;
    }
  }
`;
