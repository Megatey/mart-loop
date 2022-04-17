import './navbar.css'
import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'

const NavBar = () => {
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()
    // const userData = useSelector(state => state.useTheReducer.userData)

    const signOut = () => {
  window.localStorage.clear()
  navigate('/')

    }
    
    return (
        <div className='nav-header'>
            <div className='header'>
                <div className="navigation">
                    <div className='site-name'> <h3>ML</h3> </div>
                    <button className="toggleBtn" onClick={() => setToggle(!toggle)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" /></svg>
                    </button>
                </div>
            </div>
            {toggle && <div className="menu-list">
                <ul>
                {localStorage.getItem('token') ? <> 
                {/* <li><p>Dashboard</p></li> */}
                    <Link to='/shop' style={{textDecoration:'none'}}><li><p>Shop</p></li></Link>
                    <Link to='/carts' style={{textDecoration:'none'}}><li><p>Carts</p></li></Link>
                    <Link to='/orders' style={{textDecoration:'none'}}><li><p>Orders</p></li></Link>
                    <li><p onClick={signOut}>Sign out</p></li>
                    </> :
                    <>
                    <Link to='/' style={{textDecoration:'none'}}><li><p>Sign in</p></li></Link>
                    <Link to='/signup' style={{textDecoration:'none'}}><li><p>Sign up</p></li></Link>
                    </>}
                </ul>
            </div>}
            <div className="menu-list-desktop">
                <ul>
                {localStorage.getItem('token') ? <> 
                {/* <li><p>Dashboard</p></li> */}
                <Link to='/shop' style={{textDecoration:'none'}}><li><p>Shop</p></li></Link>
                <Link to='/carts' style={{textDecoration:'none'}}><li><p>Carts</p></li></Link>
                <Link to='/orders' style={{textDecoration:'none'}}><li><p>Orders</p></li></Link>
                    <li><p onClick={signOut}>Sign out</p></li>
                    </> :
                    <>
                    <Link to='/' style={{textDecoration:'none'}}><li><p>Sign in</p></li></Link>
                    <Link to='/signup' style={{textDecoration:'none'}}><li><p>Sign up</p></li></Link>
                    </>}
                </ul>
            </div>
        </div>
    )
}

export default NavBar