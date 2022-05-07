import * as actionType from '../actions/actionType';

const initialState = {
  productAPI: [],
};

const fetchProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_PRODUCTS:
      return {
        productAPI: [...action.payload],
      };

    default:
      return state;
  }
}

export default fetchProductsReducer;
