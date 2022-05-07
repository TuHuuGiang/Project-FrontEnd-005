import * as actionType from './actionType';

// Cart Redux
export const buyProduct = (product, quantity) => {
    return {
        type: actionType.BUY_PRODUCT,
        payload: product, quantity
    };
}

export const deleteProduct = (product) => {
    return {
        type: actionType.DELETE_PRODUCT,
        payload: product
    };
}

export const deleteCartFunc = (arr) => {
    return {
        type: actionType.DELETE_CART,
        payload: arr
    };
}

// Save quantity cart --> checkout
export const saveQuantityFunc = (quantity) => {
    return {
        type: actionType.SAVE_QUANTITY_CART,
        payload: quantity
    };
}

// Save API
export const fetchApi = (products) => {
    return {
        type: actionType.FETCH_PRODUCTS,
        payload: products
    };
}

// Check User Login
export const checkUserFunc = (user, id) => {
    return {
        type: actionType.CHECK_USER,
        payload: user, id
    };
}

// Del User Log out
export const delUserFunc = (user) => {
    return {
        type: actionType.DEL_USER,
        payload: user
    };
}

// Get Information User
export const getInfoUserFuc = (info) => {
    return {
        type: actionType.INFO_USER,
        payload: info
    };
}

// Fetch order user
export const fetchOrderUserFunc = (order) => {
    return {
        type: actionType.FETCH_ORDER_USER,
        payload: order
    };
}