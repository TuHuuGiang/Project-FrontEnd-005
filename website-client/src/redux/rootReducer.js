import { combineReducers } from 'redux';
import cartReducer from './reducers/index';
import quantityReducer from './reducers/saveQuantity';
import fetchProductsReducer from './reducers/fetchApi';
import checkUserReducer from './reducers/checkUser';
import infoUserReducer from './reducers/informationUser';
import fetchOrderUserFunc from './reducers/fetchOrders';

const rootReducer = combineReducers({
    cart: cartReducer,
    saveQuantity: quantityReducer,
    productsApi: fetchProductsReducer,
    checkUser: checkUserReducer,
    info: infoUserReducer,
    infoOrders: fetchOrderUserFunc
});

export default rootReducer;