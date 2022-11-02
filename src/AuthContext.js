/* eslint-disable no-undef */
/* eslint-disable no-useless-return */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { UserManager, User, WebStorageStateStore,Log } from 'oidc-client-ts';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import getProfile from './MsGraph';


export const AuthContext=React.createContext(null);

export const hasCodeInUrl=(location)=>{
  const searchParams=new URLSearchParams(location.serach);
  const hashParams=new URLSearchParams(location.hash.replace('#','?'));

  return Boolean(
    searchParams.get('code')||
    searchParams.get('id_token')||
    searchParams.get('session_state')||
    hashParams.get('code')||
    hashParams.get('id_token')||
    hashParams.get('session_state')
  );
};

export const initUserManager=(props)=>{
  if(props.userManager) return props.userManager;
  const{
    authority,
    client_id,
    clinet_secret,
    redirect_uri,
    silent_redirect_uri,
    post_logout_redirect_uri,
    response_type,
    scope
  }=props;
 return new UserManager({
  authority:authority,
  client_id:client_id,
  client_secret:clinet_secret,
  redirect_uri:redirect_uri,
  silent_redirect_uri:silent_redirect_uri,
  post_logout_redirect_uri:post_logout_redirect_uri,
  response_type:response_type,
  scope:scope,
  userStore:new WebStorageStateStore({store: window.sessionStorage})
  })
}
export const AuthConsumer=AuthContext.Consumer;

export const AuthProvider=({children,autoSignIn=true,onSignIn,location=window.location,...props})=>{
  const [isLoading,setIsLoading]=useState(true);
  const [userData, setUserData]=useState(null);
  const [isAuthenticated,setIsAthenticated]=useState(false);
  const [userManager]=useState(()=>initUserManager(props));
  const [msprofile,setMsprofile]=useState(null);

  Log.setLogger(console);
  Log.setLevel(Log.DEBUG);
  console.log(props)
  console.log('usermanager created')
  console.log(userManager)
  const signOutHooks=useCallback(async()=>{
    setUserData(null);
  });

  const signInHooks=useCallback(async()=>{
    console.log('redirect');
    const userFromRedirect=await userManager.signinRedirect();
    setUserData(userFromRedirect);
    onSignIn && onSignIn(userFromRedirect);
    await userManager.signinRedirectCallback();
  },[userManager, onSignIn]);

  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${props.authority}:${props.client_id}`))
  var idp=null;
useEffect( async ()  => {
/*   if(oidcStorage.profile.idp==="OpenIdConnect" ){

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${oidcStorage.access_token}`,
          'Content-type': 'application/json'
        }
      };
      const url=`https://localhost:7101/api/TokenGraph/getProfile?email=${oidcStorage.profile.email}`;

      const response= await fetch(url,options);

      if(!response.ok){
        const responseData= await response.json();
        console.log(responseData.message);
        throw new Error(`There was an error fetching`);
      }
      const responseData= await response.json();
      setMsprofile(responseData);

      console.log(responseData);
    }else{
      setMsprofile(oidcStorage.profile);
    }; */


}, []);


useEffect(() => {

  const getUser=async()=>{
    const isMounted =isMountedRef.current;
    console.log('useeffect')
    console.log('storeage',sessionStorage);
    if(hasCodeInUrl(location)){
      console.log('usee-----')
      const user=await userManager.signinCallback();
      setUserData(user);
      setIsLoading(false);
      onSignIn && onSignIn(user);
      return ;
    }

    const user=await userManager.getUser();

    if((!user || user.expired) && autoSignIn){
      console.log('useeffect-signin')
      console.log(userManager);
      userManager.signinRedirect();
    }else if(isMounted){
      setIsAthenticated(true)
      setUserData(user);
      setIsLoading(false);
    }

  }
  getUser();
}, [userManager,location,autoSignIn,onSignIn]);

useEffect(() => {
  console.log('refresh')
  const updateUserData = async () => {
    const user = await userManager.getUser();
    console.log(user)
    isMountedRef.current && setUserData(user);
    setIsAthenticated(true);
  };

  userManager.events.addUserLoaded(updateUserData);

  return () => userManager.events.removeUserLoaded(updateUserData);
}, [userManager]);


const value = useMemo(() => {
  return {
    signIn: async (args) => {
      await userManager.signinRedirect(args);


    },
    signInPopup: async () => {
      await signInHooks();
    },
    signOut: async () => {
      await userManager.removeUser();
      await signOutHooks();
    },
    signOutRedirect: async (args) => {
      await userManager.signoutRedirect(args);
      await signOutHooks();
    },
    userManager,
    userData,
    isLoading,
    isAuthenticated,
    oidcStorage,
    msprofile,
    idp
  };
}, [userManager, isLoading, userData,  signInHooks, signOutHooks,msprofile]);


return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
}
