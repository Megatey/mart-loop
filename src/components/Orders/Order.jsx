import React, { useEffect, useState } from 'react'
import './orders.css'

const Order = ({ order }) => {
    const [fetchedProducts, setFetchedProducts] = useState()
    const { productId, quantity, amount, address, status } = order
    console.log(productId, quantity);

    //getting product for filtering
    const getProducts = async () => {
        console.log('starting.....');
        try {
            console.log('fetching datas');
            const getData = await fetch(`${process.env.REACT_APP_BASEURL}/products`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')

                }
            })
            const res = await getData.json()
            console.log('fetched datas', res);
            setFetchedProducts(res.data)

        } catch (error) {
            console.log('network error', error);
            alert(error.message)
        }
    }

    useEffect(() => {
        const products = getProducts()

        return () => {
            products()
        }
    }, [])
    //    filtering specified product needed
    console.log('fecthed products', fetchedProducts);

    const specifiedProduct = fetchedProducts?.filter(product => product._id === productId)
    console.log('specified products', specifiedProduct);


    return (
        <>
            <div className='order-container'>
                <div className="order-image-container">
                    <img src={specifiedProduct?.[0].img} alt="order" className='order-image' />
                </div>
                <div className="order-info-container">
                    <h3 className="order-name">{specifiedProduct?.[0].title}</h3>
                    <h3 className="order-quanitity">Quantity: {quantity}</h3>
                </div>
                <div className="amount-container">
                    <h3 className="price">#{amount}</h3>
                    <h3 className="total-price">Total Price: #{(amount * quantity)}</h3>
                </div>
                <div className='address-container'><p className="address">{address}</p></div>
                <div className="delete-order-button-container">
                    <button  className="delete-button"><h3>Delete Order</h3></button>
                </div>
            </div>
        </>
    )
}

export default Order