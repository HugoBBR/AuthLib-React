/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react'
import styles from './styles.module.css'
import { useAuth } from './UseAuth'
import Button from '@mui/material/Button';


export const ExampleComponent = ({ text }) => {
  const auth=useAuth();
  console.log('MSPROFILE',auth.msprofile);
  // eslint-disable-next-line react/jsx-no-undef
  return (<div className={styles.test}>Example Component: {text}: {auth.profile}<Button variant="contained" onClick={()=>auth.signOut()}>Logout</Button>
  </div>
  )
}
export * from './AuthContext';
export * from './UseAuth';
export * from './PrivateRoute'

export { User, UserManager, Log } from 'oidc-client-ts'
