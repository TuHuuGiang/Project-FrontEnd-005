import * as actionType from './actionType';

// Save API
export const fetchProductsApi = (products) => {
    return {
        type: actionType.FETCH_PRODUCTS,
        payload: products
    };
}

export const fetchUsersApi = (user) => {
    return {
        type: actionType.FETCH_USERS,
        payload: user
    };
}

export const fetchOrdersApi = (order) => {
    return {
        type: actionType.FETCH_ORDERS,
        payload: order
    };
}

// Check User Login
export const checkUserFunc = (user) => {
    return {
        type: actionType.CHECK_USER,
        payload: user
    };
}

// Del User Log out
export const delUserFunc = (user) => {
    return {
        type: actionType.DEL_USER,
        payload: user
    };
}