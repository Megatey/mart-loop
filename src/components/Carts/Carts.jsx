import './carts.css';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCartsProducts } from '../../redux';
import Cart from './Cart' 

const Carts = () => {
  const dispatch = useDispatch()
  const carts = useSelector(state => state.useTheReducer.cartsProducts)
  console.log(carts);

    //get all cart function
    const getAllCarts = async () => {
        console.log('starting.....');
        try {
            console.log('fetching carts');
            const getCarts = await fetch(`${process.env.REACT_APP_BASEURL}/carts/findByUserId`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')

                }
            })
            const res = await getCarts.json()
            console.log('fetched carts', res);
            if(res.status.code === 100) {
              dispatch(setCartsProducts(res.data))
            }
            
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
    <div className='carts-container'>
      <div className="carts-head">
        <h1 className="carts-title">Carts</h1>
      </div>
      <div className="carts-listing-container">
        {carts.map((cart) => <Cart key={cart.productId} cart={cart}/>)}
      </div>
    </div>
  )
}

export default Carts