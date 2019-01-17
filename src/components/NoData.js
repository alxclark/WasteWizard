import React from 'react';
import styled from '@emotion/styled';

const EmptyListSection = styled.div`
  text-align: center;
`

const BrowseAllButton = styled.button`
  border: none;
  background: ${props => props.theme.colors.primary};
  color: white;
  font-size: 1.5rem;
  padding: 0.2rem 0.9rem;
  border-radius: 3px;
  box-shadow: ${props => props.theme.shadow};
  font-weight: 600;
`

export default function NoData({ handleClick }) {
  return (
    <EmptyListSection>
      <p>
        Find out where to properly dispose of garbage, recycling, organics and other items.
        </p>
      <BrowseAllButton onClick={handleClick}>Browse All</BrowseAllButton>
    </EmptyListSection>
  );
}