import React from 'react';
import styled from '@emotion/styled';
import ItemList from './ItemList';


const StyledSection = styled.section`
  background: ${props => props.theme.colors.lightgreen};
  grid-row-start: 3;
  grid-row-end: 4;
  
  & > div {
    padding: 1.25rem;
    margin: auto;
    max-width: ${props => props.theme.maxWidth};
    box-sizing: border-box;
    
    & > h1 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: ${props => props.theme.colors.primary};
      font-size: 1.75rem;
      font-weight: 800;
    }
  }
`

function Favourites({ items, handleFavourite }) {
  if (items.length > 1) {
    return (
      <StyledSection>
        <div>
          <h1>Favourites</h1>
          <ItemList
            items={items}
            favourites={items}
            handleFavourite={handleFavourite}
          />
        </div>
      </StyledSection>
    );
  }
  return null;
}

export default Favourites;