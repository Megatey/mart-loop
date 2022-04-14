import React, { useEffect, useState } from 'react'
import './productdetails.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setProductDetails } from '../../redux'

const ProductDetails = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const productInfo = useSelector(state => state.useTheReducer.productDetails)
    const {_id, title, desc, price, categories, inStock} = productInfo


    // get single product details function

    const getProductDetails = async () => {
        console.log('starting.....');
        try {
            console.log('fetching datas');
            const getData = await fetch(`https://shopping-ecommerce-app.herokuapp.com/api/products/${productId}`, {
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
    return (
        <div>
            <div key={_id} className="detail-container">
                <div className="product-image-container">
                    <img src="/images/product_image.png" alt="product photo" className="pix-container" />
                </div>
                <div className="product-info-container">
                    <h3 className='product-title'>{title}</h3>
                    <div className="price-available-container">
                    <p className="item-price">$ {price}</p>
                    <button disabled={true} style={inStock ? {
                        backgroundColor: 'green',
                        padding: '10px',
                        color: 'white',
                        fontSize: '16px'
                    } : {
                        backgroundColor: 'red',
                        padding: '10px',
                        color: 'white',
                        fontSize: '16px'
                    } }>{inStock ? 'In Stock' : 'Out of Stock'}</button>
                    </div>
                    <p className="product-desc">{desc}</p>
                    <div className="optional-buttons">
                        {!addCart && <button className="add-to-cart">Add To Cart</button>}
                        {!orderProduct && <button className="order-product">Order</button>}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProductDetails