import React, {useState, useEffect} from 'react'
import './carts.css'

const Cart = ({ cart }) => {
  const [fetchedProducts, setFetchedProducts] = useState()
  const { productId, quantity } = cart
  // console.log(quantity);


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

  //filtering specified product needed
  // console.log('fecthed products', fetchedProducts);

  const specifiedProduct = fetchedProducts?.filter(product => product._id === productId)
  // console.log('specified products', specifiedProduct);



  //removing from cart function
  const removeProduct = async () => {
    console.log('start removing');
    try {
      console.log('removing');
      const remData = await fetch(`${process.env.REACT_APP_BASEURL}/carts/${productId}`, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      const rep = await remData.json()
      console.log(rep);
      if(rep.status.code === 100) {
        console.log('remove succefuly');
      }
    } catch (err) {
      console.log('error', err);
    }
  }
  
  return (
    <>
      <div className='cart-container'>
        <div className="cart-image-container">
          <img src={specifiedProduct?.[0].img} alt="cart" className='cart-image' />
        </div>
        <div className="cart-info-container">
          <h3 className="cart-name">{specifiedProduct?.[0].title}</h3>
          <h3 className="cart-quanitity">Quantity: {quantity}</h3>
        </div>
        <div className="remove-button-container">
            <button onClick={removeProduct} className="remove-button"><h3>Remove From Cart</h3></button>
        </div>
      </div>
    </>
  )
}

export default Cart