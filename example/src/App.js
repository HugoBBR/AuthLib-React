import React from 'react'

import { ExampleComponent, AuthProvider,PrivateRoute } from 'reactlib'
import 'reactlib/dist/index.css'

const oidcConfig = {
  onSignIn: () => {
    alert('You just signed in, congratz! Check out the console!');
    console.log('user');
  },
  authority: "https://localhost:44310",
  client_id: "uwu",
  client_secret: "secret",
  redirect_uri: "http://localhost:3000/callback.html",
  post_logout_redirect_uri: "http://localhost:3000/signout-redirect.html",
  silent_redirect_uri: "http://localhost:3000/silent-callback.html",
  response_type: "code",
  scope: "openid profile roles",
};



const App = () => {

  return (
    <AuthProvider {...oidcConfig}>
      <PrivateRoute Component={<ExampleComponent text="Create React Library Example 😄" />}/>
  </AuthProvider>)
}

export default App
