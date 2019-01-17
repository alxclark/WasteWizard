import React, { useState } from 'react';
import styled from '@emotion/styled';
import isEmptyOrSpaces from '../lib/isEmptyOrSpaces';
import { ReactComponent as SearchIcon } from '../assets/search.svg';

function Search({ handleSearch, resetResults }) {
  const [query, setQuery] = useState('');

  function keyPress(event) {
    const enterKeyPressed = event.keyCode === 13;
    if (enterKeyPressed) {
      handleSearch(query);
    }
  }

  function handleChange(event) {
    const queryString = event.target.value;

    setQuery(queryString);
    if (isEmptyOrSpaces(queryString)) {
      resetResults();
    }
  }

  function handleClick() {
    handleSearch(query);
  }

  return (
    <StyledSearch>
      <input type="text" onKeyDown={keyPress} onChange={handleChange} placeholder="Search by keyword..." />
      <button onClick={handleClick}><SearchIcon /></button>
    </StyledSearch>
  );
}

const StyledSearch = styled.div`
  display: flex;

  & > input {
    border: 1px solid ${props => props.theme.colors.gray};
    border-radius: 3px;
    font-size: 1.5rem;
    flex-grow: 1;
    padding: 10px;
  }

  & > button {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 3px;
    margin: 0 0 0 1rem;
    background: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadow};

    & > svg {
      margin-top: 5px;
    }
  }
`

export default Search;
