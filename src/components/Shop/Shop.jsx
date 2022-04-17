import React, { useEffect, useState } from 'react'
import './shop.css'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from '../../redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'




const Shop = () => {
  const products = useSelector(state => state.useTheReducer.allProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [commodities, setCommodities] = useState()
  const [items, setItems] = useState()

  //getProducts Function
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
      if (res.status.code === 100) {
        dispatch(setProducts(res.data))
      }
    } catch (error) {
      console.log('network error', error);
      alert(error.message)
    }
      }
  useEffect(() => {

    const fetch = getProducts()

    if(!localStorage.getItem('token')) {
        navigate('/')
    }

    return () => {
      fetch()
    }
  }, [])
  console.log(products);

  //Pagination button functions

  const mapping = products.filter((item, index) => {
    const isPerfect = (index + 1) / 4
    if (Number.isInteger(isPerfect) === true) {
      return item
    }
  })


      // display products amount function
const handleClick = (incoming) => {
  const newArray = products.slice(incoming * 4, (incoming * 4) + 4)
  setCommodities(newArray)
}
  const btnDisplay = mapping.map((btn, index) => (<li onClick={() => handleClick(index)}>{index + 1}</li>))



useEffect(() => {
  const originalArr = products.slice(0, 4)
  setCommodities(originalArr)
}, [products])

console.log(commodities, 'new products');

//function for searching all products

const homeDisplay = () => {
  const newitems =  commodities?.map((product) => (
    <div key={product._id} className="product-container">
      <div className="product-image-container">
        <img src="/images/product_image.png" alt="product pix" className='product-image' />
      </div>
      <h3 className="product-name">{product.title}</h3>
      <h3 className="product-price">$ {product.price}</h3>
      <Link to={`/product/${product._id}`}><button className='buy-button'>Buy Now</button></Link>
    </div>
  ))
  setItems(newitems)
}
// This is for calling all products function automatically 
useEffect(() => {
  homeDisplay()
}, [commodities])

//function for searching gender based products
const genderBasedItems = (gender) => {
  const genderItems = commodities.filter(item => item.categories.includes(gender))
  const newarrDisplay = genderItems?.map((product) => (
    <div key={product._id} className="product-container">
      <div className="product-image-container">
        <img src="/images/product_image.png" alt="product pix" className='product-image' />
      </div>
      <h3 className="product-name">{product.title}</h3>
      <h3 className="product-price">$ {product.price}</h3>
      <Link to={`/product/${product._id}`}><button className='buy-button'>Buy Now</button></Link>
    </div>
  ))
  setItems(newarrDisplay)
}
  return (
    <div className='shop'>
      <div className="shop-image-container">
        <img src="/images/bg_image.jpg" alt="shop bgi" className='shop-image'  />
      </div>
      <div className="menu-container">
        <ul>
          <li onClick={homeDisplay}>All</li>
          <li onClick={() => genderBasedItems('men')}>Men</li>
          <li onClick={() => genderBasedItems('women')}>Women</li>
        </ul>
      </div>
      <hr className='horizontal-line'/>
      <div className="products-container">
        {items}
      </div>
      <nav className='pagination'>
          <ul>
            {btnDisplay}
          </ul>
      </nav>
      {/* {products.length > 0 ? <>fetched</> : <h3>Loading...</h3>} */}
    </div>
  )
}

export default Shop