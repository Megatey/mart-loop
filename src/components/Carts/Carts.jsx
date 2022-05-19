import './carts.css';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCartsProducts } from '../../redux';
import Cart from './Cart' 

const Carts = () => {
  const dispatch = useDispatch()
  const carts = useSelector(state => state.useTheReducer.cartsProducts)
  console.log(carts);

  const [showAlert, setShowAlert] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)
  const [msg, setMsg] = useState('Alert .................')
  const [errorDisplay, setErrorDisplay] = useState(false)
  const [loading, setLoading] = useState(false)


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
              setLoading(false)
              dispatch(setCartsProducts(res.data))
            }
            
        } catch (error) {
            console.log('network error', error);
            setShowAlert(true)
              setLoading(false)
                setSuccessAlert(false)
                setMsg('Unable to fetch datas. REFRESH PAGE.')
                setErrorDisplay(true)
        }
    }

    useEffect(() => {
      setLoading(true)
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
      {!loading && carts.length ? <div className="carts-listing-container">
        {carts.map((cart) => <Cart key={cart.productId} cart={cart}/>)}
      </div> : !loading && !carts.length ? <div style={{textAlign: 'center'}}><h2>Order List Empty</h2></div> : null}
      {loading && !showAlert ? <div className='loader-container'> <img src="/images/loading-buffering.gif" alt="loader" className='loader' /> </div> : null}
      {showAlert && <div className={successAlert ? "success-alert-message" : "error-alert-message"}>
                    <span className="closebtn" onClick={() => setShowAlert(false)}>&times;</span>
                    {msg}
                </div>}
    </div>
  )
}

export default Carts