import './cart.css';
import React, { useEffect } from 'react'

const Cart = () => {

    //get all cart function
    const getAllCarts = async () => {
        console.log('starting.....');
        try {
            console.log('fetching carts');
            const getCarts = await fetch(`${process.env.REACT_APP_BASEURL}/allcart`, {
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
    <div>Cart</div>
  )
}

export default Cart