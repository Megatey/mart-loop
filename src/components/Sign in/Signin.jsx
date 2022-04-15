import './signin.css'
import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setUserDatas } from '../../redux'

const Signin = () => {
  const [btnEnabler, setBtnEnabler] = useState(false)
  const [alert, setAlert] = useState('')
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  

  //login function

  const loginHandler = async (e) => {
    e.preventDefault()
    console.log("working.....")
    setBtnEnabler(true)
    setAlert('')
    if (user.username && user.password) {
      try {
        console.log("starting api calls")
        const request = await fetch(`${process.env.REACT_APP_BASEURL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password
          })
        })
        const res = await request.json()
        console.log(res);
        if(res.msg) {
          console.log(res.msg);
          setAlert(res.msg)
          setBtnEnabler(false)
        }
        if (res.status.code === 100) {
            dispatch(setUserDatas(res.data))
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data._id)

            navigate('/shop')
        }
        console.log("finished api calls without errors")
      } catch (err) {
        console.log(err, "as error caught")
        if (err.message) {
          setAlert(err.message)
        }
        setBtnEnabler(false)
        console.log("finished api calls with found errors")
      }
    } else {
      setAlert('Fill in datas....')
      setBtnEnabler(false)
    }
  }
  // clear localStorage
  useEffect(() => {
    const tokenGotten = localStorage.getItem('token')
    if(tokenGotten) {
      console.log("ready to go")
      navigate('/shop')
      console.log("now gone")
      console.log(process.env);
      // alert('Go to shop')
      // return
    }
  
  }, [])
  return (
    <div className='signin'> 
      <div className="signin-header">
        <h3>Sign in</h3>
      </div>
      <div className="main">
        <form onSubmit={loginHandler} className='signin-form'>
          <div className="input-container">
          <input type="username" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} placeholder='Your username'/>
          </div>
          <div className="input-container">
          <input type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} placeholder='Your password'/>
          </div>
          <span className="forget-password">Forget password?</span>
          <button type="submit" disabled={btnEnabler} >Sign in</button>
        </form>
        <p className="register">Not a member? <Link to='/signup' style={{textDecoration: 'none'}}><span>Register</span></Link></p>
        <p style={{ textAlign: 'center', color: 'red' }}>{alert}</p>
      </div>
    </div>
  )
}

export default Signin