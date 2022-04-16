import React, { useEffect, useState } from 'react'
import './productdetails.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setProductDetails } from '../../redux'

const ProductDetails = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const productInfo = useSelector(state => state.useTheReducer.productDetails)
    const { _id, title, desc, price, categories, inStock } = productInfo


    // get single product details function

    const getProductDetails = async () => {
        console.log('starting.....');
        try {
            console.log('fetching datas');
            const getData = await fetch(`${process.env.REACT_APP_BASEURL}/products/${productId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')

                }
            })
            const res = await getData.json()
            console.log('fetched datas', res);
            if (res.status.code === 100) {
                dispatch(setProductDetails(res.data))
            }
        } catch (error) {
            console.log('network error', error);
            alert(error.message)
        }
    }

    useEffect(() => {
        const getting = getProductDetails()

        return () => {
            getting()
        }
    }, [])
    console.log(productInfo, 'selector info');

    //state for option button
    const [addCart, setAddCart] = useState(false)
    const [orderProduct, setOrderProduct] = useState(false)

    //state for quantity of product carted or ordered
    const [amount, setAmount] = useState(1)
    if (amount < 1) {
        setAmount(1)
    }

    //state for alert message when carting or ordering
    const [msg, setMsg] = useState('Alert .................')

    //for show alert state
    const [showAlert, setShowAlert] = useState(false)
    
    //state for alert types
    const [successAlert, setSuccessAlert] = useState(false)

    //function for adding product to cart
    const addToCart = async () => {
        console.log('running carting function');
        try {
            console.log('trying carting address');
            const postCart = await fetch(`${process.env.REACT_APP_BASEURL}/carts`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('id'),
                    products:[{
                        productId: _id,
                        quantity: amount
                    }]
                })
            })
            const resCart = await postCart.json()
            console.log('successful response', resCart);
            if(resCart.status.code === 100) {
                setShowAlert(true)
                setSuccessAlert(true)
                setMsg(resCart.status.msg)
                setAddCart(true)
            }
        } catch (err) {
                console.log('error occur', err);
                setShowAlert(true)
                setSuccessAlert(false)
                setMsg('Something went wrong. Input all infos or check your network.')
        }
    }

    //address state
    const [supplyAddress, setSupplyAddress] = useState('')

    //function for ordering product
    const orderingProduct = async () => {
        console.log('running ordering');
        try {
            console.log('trying ordering');
            const postOrder = await fetch(`${process.env.REACT_APP_BASEURL}/orders`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('id'),
                    products:[{
                        productId: _id,
                        quantity: amount
                    }],
                    amount: price,
                    address: supplyAddress
                })
            })
            const resOrder = await postOrder.json()
            console.log('successful response', resOrder);
            if(resOrder.status.code === 100) {
                setShowAlert(true)
                setSuccessAlert(true)
                setMsg(resOrder.status.msg)
                setOrderProduct(true)
            }

        } catch(err) {
                console.log('error', err.message);
                setShowAlert(true)
                setSuccessAlert(false)
                setMsg('Something went wrong. Input all infos or check your network.')
        }
    }
    
    return (
        <div>
            <div key={_id} className="detail-container">
                <div className="product-image-container">
                    <img src="/images/product_image.png" alt="product" className="pix-container" />
                </div>
                <div className="product-info-container">
                    <h3 className='product-title'>{title}</h3>
                    <div className="price-available-container">
                        <p className="item-price">$ {price}</p>
                        <button disabled={true} style={inStock ? {
                            backgroundColor: '#00FF00',
                            padding: '10px',
                            color: 'white',
                            fontSize: '16px',
                            border: 'none'
                        } : {
                            backgroundColor: 'red',
                            padding: '10px',
                            color: 'white',
                            fontSize: '16px',
                            border: 'none'
                        }}>{inStock ? 'In Stock' : 'Out of Stock'}</button>
                    </div>
                    <p className="product-desc">{desc}</p>
                    <div className="quantity-container">
                        <button className="decrease-button" onClick={() => setAmount(amount - 1)}>-</button>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} disabled={true} className='qty-amount' />
                        <button className="increase-button" onClick={() => setAmount(amount + 1)}>+</button>
                    </div>
                    <input type='text' name="address" value={supplyAddress} onChange={e => setSupplyAddress(e.target.value)} className="address-box" placeholder='Input Address...'/>
                    <div className="optional-buttons">
                        {!addCart && <button className="add-to-cart" onClick={addToCart}>Add To Cart</button>}
                        {!orderProduct && <button className="order-product" onClick={orderingProduct}>Order</button>}
                    </div>
                </div>
                {showAlert && <div className={successAlert ? "success-alert-message" : "error-alert-message"}>
                    <span className="closebtn" onClick={() => setShowAlert(false)}>&times;</span>
                    {msg}
                </div>}

            </div>
        </div>
    )
}

export default ProductDetails