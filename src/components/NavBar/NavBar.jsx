import './navbar.css'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
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
                {localStorage.getItem('token') ? <> <li><p>Dashboard</p></li>
                    <li><p>Shop</p></li>
                    <li><p>Cart</p></li>
                    <li><p>Orders</p></li>
                    <li><p onClick={signOut}>Sign out</p></li>
                    </> :
                    <>
                    <li><p>Sign in</p></li>
                    <li><p>Sign up</p></li>
                    </>}
                </ul>
            </div>}
            <div className="menu-list-desktop">
                <ul>
                {localStorage.getItem('token') ? <> <li><p>Dashboard</p></li>
                    <li><p>Shop</p></li>
                    <li><p>Cart</p></li>
                    <li><p>Orders</p></li>
                    <li><p onClick={signOut}>Sign out</p></li>
                    </> :
                    <>
                    <li><p>Sign in</p></li>
                    <li><p>Sign up</p></li>
                    </>}
                </ul>
            </div>
        </div>
    )
}

export default NavBar