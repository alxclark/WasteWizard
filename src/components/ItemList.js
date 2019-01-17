import React from 'react';
import styled from '@emotion/styled';
import Item from './Item';

const StyledList = styled.ul`
  padding: 0;
  margin-top: 1.5rem;
`

function ItemList({ items, favourites, handleFavourite }) {
  if (items.length < 1) {
    return null;
  }

  return (
    <StyledList>
      {items.map(item => (
        <Item
          data={item}
          key={item.title}
          handleFavourite={handleFavourite}
          isFavourite={favourites.find(favourite => favourite.title === item.title)}
        />
      ))}
    </StyledList>
  );
}

export default ItemList;