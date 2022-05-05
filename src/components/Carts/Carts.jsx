import './carts.css';
import React, { useEffect } from 'react'

const Carts = () => {

    //get all cart function
    const getAllCarts = async () => {
        console.log('starting.....');
        try {
            console.log('fetching carts');
            const getCarts = await fetch(`${process.env.REACT_APP_BASEURL}/carts/find/${localStorage.getItem('id')}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')

                }
            })
            const res = await getCarts.json()
            console.log('fetched carts', res);
            
        } catch (error) {
            console.log('network error', error);
        }
    }

    useEffect(() => {
      const unsubscribe = getAllCarts()
    
      return () => {
        unsubscribe()
      }
    }, [])
    
  return (
    <div>Carts</div>
  )
}

export default Carts