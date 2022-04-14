import './App.css';
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About'
import Signin from './components/Sign in/Signin';
import Signup from './components/Signup/Signup';
import Shop from './components/Shop/Shop';
import ProductDetails from './components/Product Details/ProductDetails';

const App = () => {
  return (
    <div>
        <NavBar/>
      <Routes>
        <Route path='/' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/product/:productId' element={<ProductDetails/>}/>
      </Routes>
      <About />
    </div>
  );
}

export default App;
