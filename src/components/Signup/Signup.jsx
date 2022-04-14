import React, { useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [btnEnabler, setBtnEnabler] = useState(false)
  const [alert, setAlert] = useState('')
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  //signup function

  const signupHandler = async (e) => {
    e.preventDefault()
    setBtnEnabler(true)
    setAlert('')
    if (user.username && user.email && user.password) {
      try {
        const request = await fetch('https://shopping-ecommerce-app.herokuapp.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user.username,
            email: user.email,
            password: user.password
          })
        })
        const res = await request.json()
        console.log(res);
        if (res.msg) {
          setAlert(res.msg)
          setBtnEnabler(false)
        }
        if (res.status.code === 100) {
          navigate('/')
        }
      }
      catch (err) {
        alert(err.message)
        setBtnEnabler(false)
      }
    } else {
      setAlert('Fill in datas....')
      setBtnEnabler(false)
    }
  }
  return (
    <div className='signup'>
      <div className="signup-header">
        <h3>Sign up</h3>
      </div>
      <div className="form-container">
        <form onSubmit={signupHandler} className="signup-form">
          <div className="input-container">
            <input type="username" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} placeholder='Your username' />
          </div>
          <div className="input-container">
            <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder='Your email address' />
          </div>
          <div className="input-container">
            <input type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder='Your password' />
          </div>
          <button type="submit" disabled={btnEnabler}>Sign up</button>
        </form>
        <p className="login">Already a member? <Link to='/' style={{ textDecoration: 'none' }}><span>Login</span></Link></p>
        <p style={{ textAlign: 'center', color: 'red' }}>{alert}</p>
      </div>
    </div>
  )
}

export default Signup