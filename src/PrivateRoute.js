/* eslint-disable prettier/prettier */
import React from 'react';
import { AuthConsumer } from './AuthContext';
import Login from './Login';

export const PrivateRoute=({Component,...res})=>{

  return <AuthConsumer>
   {({ oidcStorage,signIn }) => {
                    console.log("user manager",oidcStorage);
        if (oidcStorage && oidcStorage.access_token) {
            console.log("authenticated");
            return Component;
        } else {
            console.log("redirect");
            signIn();
            return <Login/>
        }
    }}</AuthConsumer>
}
