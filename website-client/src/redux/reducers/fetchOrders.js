import * as actionType from '../actions/actionType';

const initialState = {
    ordersUser: [],
    orderDeli: [],
    orderReceive: [],
    orderCancel: []
};

const fetchUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_ORDER_USER:
            return {
                ordersUser: [...action.payload],
            };

        default:
            return state;
    }
}

export default fetchUserReducer;