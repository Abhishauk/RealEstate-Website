import React, { useContext, useEffect } from 'react'
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { createHashRouter, Outlet } from 'react-router-dom';
import UserDetailContext from '../context/UserDetailesContext';
import { useMutation } from 'react-query';
import { createUser } from '../utils/api';
import { useAuth0 } from '@auth0/auth0-react';
import useFavourites from '../hooks/useFavourites';
import UseBookings from '../hooks/UseBookings';

const Layout = () => {

  useFavourites();
  UseBookings();

  const { isAuthenticated , user , getAccessTokenWithPopup } = useAuth0()
  const { setUserDetails } = useContext(UserDetailContext)

  const  {mutate}  = useMutation({
    mutationkey: [user?.email],
    mutationFn: (token) => createUser(user?.email , token),
  });


  useEffect(()=> {

    const getTokenAndRegister =async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token" , res);
      setUserDetails((prev)=> ({...prev , token: res}));
      mutate(res)
      
    };

    
    isAuthenticated && getTokenAndRegister()

  }, [isAuthenticated])


  return (
    <>
    <div style={{background: "var(--black)", overflow: "hidden"}}>
        <Header />
        <Outlet />
   </div>
        <Footer/>
      
    </>
  )
}

export default Layout