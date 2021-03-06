import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from './Hoc/Auth';

import Header from './Components/Header_footer/header';
import Footer from './Components/Header_footer/footer';
import Home from './Components/Home';
import SignIn from './Components/Signin';
import TheTeam from './Components/theTeam';

import Dashboard from './Components/Admin/Dashboard';
import AdminPlayers from './Components/Admin/players';
import AddEditPlayer from './Components/Admin/players/addEditPlayers'

const Routes = ({user}) => {

  return (
    <BrowserRouter>
      <Header user={user}/>
      <Switch>
        <Route path="/admin_players/edit_player/:playerid" exact component={AuthGuard(AddEditPlayer)}/>
        <Route path="/admin_players/add_player" exact component={AuthGuard(AddEditPlayer)}/>
        <Route path="/admin_players" exact component={AuthGuard(AdminPlayers)}/>
        <Route path="/dashboard"  component={AuthGuard(Dashboard)}/>
        <Route path="/the_team"  component={TheTeam}/>
        <Route path="/sign_in" exact component={ 
          props => (<SignIn {...props} user={user}/>) 
        }/>
        <Route path="/" exact component={Home}/>
      </Switch>
      <ToastContainer />
      <Footer/>
    </BrowserRouter>
  );
  
}

export default Routes;
