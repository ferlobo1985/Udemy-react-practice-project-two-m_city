import React from 'react';
import { Redirect } from 'react-router-dom';
import { firebase } from '../firebase';


const AuthGuard = (Component) => {
    class AuthHoc extends React.Component {
        
        authCheck = () => {
            const user = firebase.auth().currentUser;
            if(user){
                return <Component {...this.props}/>
            } else {
                return <Redirect to="/"/>
            }
        }
        render(){
            return this.authCheck()
        }  
    }
    return AuthHoc;
}

export default AuthGuard