import * as actionType from '../actions/actionType';

const initialState = {
    infoUser: {}
};

const infoUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.INFO_USER:
            return {
                infoUser: {...action.payload}
            };
    
        default:
            return state;
    }
}

export default infoUserReducer;