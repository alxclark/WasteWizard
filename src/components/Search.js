import React, { useState } from 'react';
import styled from '@emotion/styled';
import Downshift from 'downshift';
import isEmptyOrSpaces from '../lib/isEmptyOrSpaces';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import VirtualList from 'react-tiny-virtual-list';

function Search({ handleSearch, resetResults, allKeywords }) {
  const [query, setQuery] = useState('');
  const [matchingKeywords, setMatchingKeywords] = useState(allKeywords);
  const [open, setOpen] = useState(false);

  function handleStateChange(changes) {
    if (changes.hasOwnProperty('inputValue')) {
      const queryString = changes.inputValue;
      updateSearch(queryString);
      if (queryString.trim().length < 1) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  }

  function updateSearch(queryString) {
    setQuery(queryString);
    if (isEmptyOrSpaces(queryString)) {
      resetResults();
    }
    const newKeywords = allKeywords.filter(keyword => (
      keyword.includes(queryString.toLowerCase())
    ));

    setMatchingKeywords(newKeywords);
  }

  function executeSearch(queryString = query) {
    handleSearch(queryString);
    setOpen(false);
  }

  return (
    <StyledSearch>
      <Downshift
        onSelect={executeSearch}
        onStateChange={handleStateChange}
        selectedItem={query}
        isOpen={open}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
        }) => (
            <div>
              <SearchBar
                {...getInputProps({
                  onKeyDown: event => {
                    if (event.key === 'Enter') {
                      executeSearch();
                    }
                  },
                  placeholder: "Search by keyword..."
                })}
              />
              {!isOpen || !matchingKeywords.length ? null : (
                <VirtualList
                  width='100%'
                  scrollToIndex={highlightedIndex || 0}
                  scrollToAlignment="auto"
                  height={matchingKeywords.length < 5 ? matchingKeywords.length * 42 : 42 * 5}
                  itemCount={matchingKeywords.length}
                  itemSize={42}
                  renderItem={({ index, style }) =>
                    <DropdownItem
                      className={highlightedIndex === index && 'highlighted'}
                      key={index}
                      style={style}
                      {...getItemProps({
                        style,
                        item: matchingKeywords[index],
                        index,
                      })}
                    >
                      {matchingKeywords[index]}
                    </DropdownItem>
                  }
                />
              )}
            </div>
          )}
      </Downshift>
      <SearchButton onClick={() => executeSearch()}><SearchIcon /></SearchButton>
    </StyledSearch>
  );
}

const SearchBar = styled.input`
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 3px;
  font-size: 1.5rem;
  flex-grow: 1;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`

const SearchButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  flex-shrink: 0;
  border-radius: 3px;
  margin: 0 0 0 1rem;
  background: ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadow};

  & > svg {
    margin-top: 5px;
  }
`

const DropdownItem = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &.highlighted {
    background: #25985c;
    color: white;
  }
`

const StyledSearch = styled.div`
  display: flex;

  & > div {
    width: 100%;
    position: relative;

    & > div {
      position: absolute;
      background: white;
      box-sizing: border-box;
      margin-top: 1rem;
      border-radius: 3px;
      border: 1px solid #b4b4b4;
    }
  }
`

export default Search;
