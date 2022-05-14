import { SET_USER_DATA, SET_ALL_PRODUCTS, SET_PRODUCT_DETAILS, SET_CARTS_PRODUCTS, SET_ORDERS_PRODUCTS} from "./action";
  
  let initialState = {
    userDatas:{},
    allProducts:[],
    productDetails:{},
    cartsProducts:[],
    ordersProducts:[]
  };
  
  function useTheReducer(state = initialState, action) {
    switch (action.type) {
      case SET_USER_DATA:
        return { ...state, userDatas: action.payload };

      case SET_ALL_PRODUCTS:
        return {...state, allProducts: action.payload }

      case SET_PRODUCT_DETAILS:
        return {...state, productDetails: action.payload}

      case SET_CARTS_PRODUCTS:
        return {...state, cartsProducts: action.payload}

      case SET_ORDERS_PRODUCTS:
        return {...state, ordersProducts: action.payload}
        
      default:
        return state;
    }
  }
  
  export default useTheReducer;
