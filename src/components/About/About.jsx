import './about.css'
import React from 'react'

const About = () => {
  return (
    <div>
      <div className='about'>
        <div className='about-container'>
          <span>
            <h3>About me</h3>
            <p>Here you can create and order produts of your desire. This is a site for purchasing and seliing products, a platform where buyers and sellers meets.</p>
          </span>
        </div>
        <div className="product-container">
          <span>
            <h3>Product</h3>
            <ul>
              <li>Clothing</li>
              <li>Footwear</li>
              <li>Jewellwery</li>
            </ul>
          </span>
        </div>
        <div className="contact-container">
          <span>
            <h3>Contact</h3>
            <ul>
              <li>Lagos State, Nigeria</li>
              <li>+2349024343853</li>
              <li>megatey97@gmail.com</li>
            </ul>
          </span>
        </div>
      </div>
      <div className="copyright">
        <p>© 2022 Copyright</p>
      </div>
    </div>
  )
}

export default About