import { SET_USER_DATA, SET_ALL_PRODUCTS, SET_PRODUCT_DETAILS} from "./action";
  
  let initialState = {
    userDatas:{},
    allProducts:[],
    productDetails:{}
  };
  
  function useTheReducer(state = initialState, action) {
    switch (action.type) {
      case SET_USER_DATA:
        return { ...state, userDatas: action.payload };

        case SET_ALL_PRODUCTS:
          return {...state, allProducts: action.payload }

      case SET_PRODUCT_DETAILS:
        return {...state, productDetails: action.payload}
        
      default:
        return state;
    }
  }
  
  export default useTheReducer;
