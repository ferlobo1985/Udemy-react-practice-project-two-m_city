import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Header from './Components/Header_footer/header';
import Footer from './Components/Header_footer/footer';
import Home from './Components/Home';
import SignIn from './Components/Signin';

const Routes = (props) => {


  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/sign_in" exact component={SignIn}/>
        <Route path="/" exact component={Home}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
  
}

export default Routes;
