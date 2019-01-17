import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

const theme = {
  colors: {
    primary: '#24995c',
    secondary: '#1b5088',
    text: '#434343',
    gray: '#b4b4b4',
    lightgreen: '#f7fefa',
    blue: '#1f73d2;'
  },
  breakpoints: {
    small: '(max-width: 767px)'
  },
  gradient: 'linear-gradient(to right, #1b5088 , #24995c)',
  maxWidth: '1200px',
  shadow: '0 2px 2px -1px rgba(0, 0, 0, 0.35)'
}

const GlobalStyles = css`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.colors.text};
  }

  html, body, body > div {
    height: 100%;
  }

  button {
    cursor: pointer;
    background: none;
  }

  a {
    color: ${theme.colors.blue}
  }
`

const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

export default function Page({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Global
          styles={GlobalStyles}
        />
        {children}
      </Container>
    </ThemeProvider>
  );
}