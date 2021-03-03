import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/app.css'
import { firebase } from './firebase';
import Routes from './routes';

const App = (props) => {
  return(
    <Routes {...props}/>
  )
}

firebase.auth().onAuthStateChanged((user)=>{
  ReactDOM.render(<App user={user}/>,document.getElementById('root'));
})
