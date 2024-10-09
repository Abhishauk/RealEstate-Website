import React, { useContext, useEffect, useRef } from 'react'
import UserDetailContext from '../context/UserDetailesContext'
import { useAuth0 } from '@auth0/auth0-react';
import { getAllFav } from '../utils/api';
import { useQuery } from 'react-query';

const useFavourites = () => {
  
    const { UserDetails , setUserDetails} = useContext(UserDetailContext)
    const queryRef = useRef();
    const {user} = useAuth0()


    const {data , isLoading , isError , refetch} = useQuery({
        querykey: "allFavourites",
        queryFn: ()=>  getAllFav(user?.email, UserDetails?.token),
        onSuccess: (data)=> setUserDetails((prev) => ({ ...prev, favourites : data})),
        enabled: user!==undefined,
        staleTime: 30000,

        
    });

    queryRef.current = refetch;

    useEffect(() => {
        queryRef.current && queryRef.current()
       
    },[UserDetails?.token])

    
    return {data , isError, isLoading , refetch};
}

export default useFavourites
