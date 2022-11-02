/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function getProfile(oidcStorage) {


  const callEndpoint = async () => {
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
      const responseData=await response.json();
      console.log(responseData.message);
      throw new Error(`There was an error fetching`);
    }
    const responseData=await response.json();
    console.log(responseData);
    return responseData;
  };
  return callEndpoint();
}
