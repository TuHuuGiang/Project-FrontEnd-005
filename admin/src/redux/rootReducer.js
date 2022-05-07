import { combineReducers } from 'redux';
import fetchProductsReducer from './reducers/fetchAPI';
import fetchUsersReducer from './reducers/fetchUsers';
import fetchOrdersReducer from './reducers/fetchOrders';
import checkUserReducer from './reducers/checkUser';

const rootReducer = combineReducers({
    productsApi: fetchProductsReducer,
    usersApi: fetchUsersReducer,
    ordersApi: fetchOrdersReducer,
    checkUser: checkUserReducer,
});

export default rootReducer;