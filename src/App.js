import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import Main from './page/Main';

const Container = styled.div`
  width: 100%;
`

const App = () => {
  return (
    <Container>
      <Route exact path="/" render={()=>
        <Main />
      } />

      <Route exact path="/list" render={()=>
        <Main />
      } />
    </Container>
  );
}

export default App;
