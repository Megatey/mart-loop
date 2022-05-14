export const SET_USER_DATA = "SET_USER_DATA";
export const SET_ALL_PRODUCTS = "SET_ALL_PRODUCTS"
export const SET_PRODUCT_DETAILS = "SET_PRODUCT_DETAILS"
export const SET_CARTS_PRODUCTS = "SET_CARTS_PRODUCTS"
export const SET_ORDERS_PRODUCTS = "SET_ORDERS_PRODUCTS"



  export const setUserDatas = (Userinfo) => {
    return {
      type: SET_USER_DATA,
      payload: Userinfo,
    };
  };

  export const setProducts = (products) => {
    return {
      type: SET_ALL_PRODUCTS,
      payload: products,
    }
  }

  export const setProductDetails = (details) => {
    return {
      type: SET_PRODUCT_DETAILS,
      payload: details,
    }
  }

  export const setCartsProducts = (carts) => {
    return {
      type: SET_CARTS_PRODUCTS,
      payload: carts,
    }
  }

  export const setOrdersProducts = (orders) => {
    return {
      type: SET_ORDERS_PRODUCTS,
      payload: orders,
    }
  }