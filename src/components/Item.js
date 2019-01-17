import React from 'react';
import styled from '@emotion/styled';
import htmlDecode from '../lib/htmlDecode';
import { ReactComponent as StarIcon } from '../assets/star.svg';

function Item({ data, handleFavourite, isFavourite }) {
  function toggleFavourite() {
    handleFavourite(data);
  }

  return (
    <ListItem>
      <button onClick={toggleFavourite}>
        <StarIcon className={isFavourite && 'active'} />
      </button>
      <p>{data.title}</p>
      <div dangerouslySetInnerHTML={{ __html: htmlDecode(data.body) }} />
    </ListItem>
  );
}

const ListItem = styled.li`
  margin-bottom: 2rem;
  list-style: none;
  display: grid;
  grid-template-columns: 20px 1fr 1fr;
  grid-gap: 1rem;
  font-size: 1.1rem;

  @media ${props => props.theme.breakpoints.small} {
    grid-template-columns: 20px 1fr;
    margin-bottom: 3rem;

    & > div {
      grid-column: 1 / 3;
    }
  }

  & > button {
    padding: 0;
    border: 0;
    height: 20px;

    svg {
      fill: ${props => props.theme.colors.gray};
      
      &.active {
        fill: ${props => props.theme.colors.primary};
      }
    }
  }

  & > p {
    margin: 0;
    font-size: 1.25rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 18px;
  }

  li + li {
    margin-top: 1rem;
  }
`


export default Item;