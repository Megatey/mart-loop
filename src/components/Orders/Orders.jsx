import React, {useEffect, useState} from 'react'
import './orders.css'
import { useDispatch, useSelector } from 'react-redux';
import { setOrdersProducts } from '../../redux';
import Order from './Order'

const Orders = () => {
    const dispatch = useDispatch()
  const orders = useSelector(state => state.useTheReducer.ordersProducts)
  console.log(orders);

  const [showAlert, setShowAlert] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)
  const [msg, setMsg] = useState('Alert .................')
  const [errorDisplay, setErrorDisplay] = useState(false)


    //get all orders function
    const getAllOrders = async () => {
        console.log('starting.....');
        try {
            console.log('fetching orders');
            const getOrders = await fetch(`${process.env.REACT_APP_BASEURL}/orders/findByUserId`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const res = await getOrders.json()
            console.log('fetched orders', res);
            if(res.status.code === 100) {
              dispatch(setOrdersProducts(res.data))
            }
            
        } catch (error) {
            console.log('network error', error);
            setShowAlert(true)
                setSuccessAlert(false)
                setMsg('Unable to fetch datas. REFRESH PAGE.')
                setErrorDisplay(true)
        }
    }

    useEffect(() => {
        const unsubscribe = getAllOrders()
      
        return () => {
          unsubscribe()
        }
      }, [])
  return (
    <div className='orders-container'>
        <div className="orders-head">
            <h1 className="orders-title">Orders</h1>
        </div>
        {orders && <div className="orders-listing-container">
        {orders.map((order) => <Order key={order.productId} order={order}/>)}
      </div>}
      {!orders.length && <div className='loader-container'> {!errorDisplay && <img src="/images/loading-buffering.gif" alt="loader" className='loader' />} </div>}
      {showAlert && <div className={successAlert ? "success-alert-message" : "error-alert-message"}>
                    <span className="closebtn" onClick={() => setShowAlert(false)}>&times;</span>
                    {msg}
                </div>}
    </div>
  )
}

export default Orders