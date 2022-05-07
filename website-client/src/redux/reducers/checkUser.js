import * as actionType from '../actions/actionType';

const initialState = {
    user: localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : {name: '', role: ''}
};

const checkUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CHECK_USER:
            if (action.payload == 'admin@gmail.com') {
                let saveUser = {
                    id: action.id,
                    name: action.payload,
                    role: 'admin'
                };
                localStorage.setItem('user', JSON.stringify(saveUser));
                return {
                    user: {
                        id: action.id,
                        name: action.payload,
                        role: 'admin'
                    }
                };
            } else {
                let saveUser = {
                    id: action.id,
                    name: action.payload,
                    role: 'user'
                };
                localStorage.setItem('user', JSON.stringify(saveUser));
                return {
                    user: {
                        id: action.id,
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