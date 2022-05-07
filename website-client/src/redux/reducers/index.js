import * as actionType from '../actions/actionType';

const initialState = {
    cartArr: localStorage.getItem("cartRedux")
    ? JSON.parse(localStorage.getItem("cartRedux"))
    : []
};

let cartReduxSaveLocal = JSON.parse(localStorage.getItem("cartRedux")) || [];

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.BUY_PRODUCT:
            const productInCart = state.cartArr.find((p) => p.id === action.payload.id);
            if (!productInCart) {
                cartReduxSaveLocal.push({
                    ...action.payload,
                    quantityDetail: action.quantity
                });
                localStorage.setItem("cartRedux", JSON.stringify(cartReduxSaveLocal));
                return {
                    cartArr: [...state.cartArr, {
                        ...action.payload,
                        quantityDetail: action.quantity
                    }],
                };
            } else {
                let newCart = state.cartArr;
                const objIndex = newCart.findIndex((obj) => obj.id == action.payload.id);
                if (newCart[objIndex].quantity === undefined) {
                    newCart[objIndex].quantityDetail = 2;
                    localStorage.setItem("cartRedux", JSON.stringify(newCart));
                } else {
                    newCart[objIndex].quantityDetail = newCart[objIndex].quantityDetail + 1;
                    localStorage.setItem("cartRedux", JSON.stringify(newCart));
                }
                localStorage.setItem("cartRedux", JSON.stringify(newCart));
                return {
                    cartArr: [...newCart]
                };
            }

            case actionType.DELETE_PRODUCT:
                let newCart = state.cartArr;
                const objIndex = newCart.findIndex((obj) => obj.id == action.payload.id);
                newCart.splice(objIndex, 1);
                localStorage.setItem("cartRedux", JSON.stringify(newCart));
                return {
                    cartArr: [...newCart]
                };

            case actionType.DELETE_CART:
                localStorage.removeItem('cartRedux');
                return {
                    cartArr: []
                };

            default:
                return state;
    }
}

export default cartReducer;