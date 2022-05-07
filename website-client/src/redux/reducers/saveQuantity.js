import * as actionType from '../actions/actionType';

const initialState = {
    quantityCart: []
};

const quantityReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SAVE_QUANTITY_CART:
            return {
                quantityCart: [...action.payload],
            };
    
        default:
            return state;
    }
}

export default quantityReducer;