import React from 'react';
import {Container} from '@material-ui/core';
import {useSelector} from 'react-redux';
import Nav from './components/Nav';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Employees from './components/Employees';
import Projects from './components/Projects';

function App(){
  const page = useSelector(state => state);
  return(
    <Container maxidth="lg">
      <Nav />
      {/*(page==='emp') ? <Employees /> : <Projects />*/}
      <BrowserRouter>
        <Switch>
          <Route path="/employees">
            <Employees />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/">
            <div align="center">
              <h1>This is the homepage</h1>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;