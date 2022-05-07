import * as actionType from '../actions/actionType';

const initialState = {
  ordersAPI: []
};

const fetchOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_ORDERS:
      return {
        ordersAPI: [...action.payload],
      };

    default:
      return state;
  }
}

export default fetchOrdersReducer;
