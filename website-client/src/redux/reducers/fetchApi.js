import * as actionType from '../actions/actionType';

const initialState = {
    productAPI: [],
    // prodSelling: [],
    // prodHoodie: [],
    // prodPants: [],
    // prodTshirt: []
};

const fetchProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_PRODUCTS:
            let productAll = action.payload.filter(p => p.isDelete === false)
            // let prodSelling = productAll.filter(p => p.numViews > 0 && p.isDelete === false);
            // let prodHoodie = productAll.filter((p) => p.cateName === 'hoodie');
            // let prodPants = productAll.filter((p) => p.cateName === 'pant');
            // let prodTshirt = productAll.filter((p) => p.cateName === 't-shirt');
            return {
                productAPI: [...productAll],
                // prodSelling: [...prodSelling],
                // prodHoodie: [...prodHoodie],
                // prodPants: [...prodPants],
                // prodTshirt: [...prodTshirt]
            };

        default:
            return state;
    }
}

export default fetchProductsReducer;