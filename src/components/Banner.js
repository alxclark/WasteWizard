import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  background-image: ${props => props.theme.gradient};
  height: 125px;
  color: white;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  justify-content: center;

  & > h1 {
    font-weight: 800;
    text-align: center;
  }
`

export default function Banner() {
  return (
    <Container>
      <h1>Toronto Waste Lookup</h1>
    </Container>
  )
}
