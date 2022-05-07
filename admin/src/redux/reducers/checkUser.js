import * as actionType from '../actions/actionType';

const initialState = {
    user: {
        name: '',
        role: ''
    }
};

const checkUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CHECK_USER:
            if (action.payload == 'admin@gmail.com') {
                return {
                    user: {
                        name: action.payload,
                        role: 'admin'
                    }
                };
            } else {
                return {
                    user: {
                        name: action.payload,
                        role: 'user'
                    }
                };
            }

        case actionType.DEL_USER:
            return {
                user: {
                    name: '',
                    role: ''
                }
            };

            default:
                return state;
    }
}

export default checkUserReducer;