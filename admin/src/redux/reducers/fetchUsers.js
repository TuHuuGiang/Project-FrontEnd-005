import * as actionType from '../actions/actionType';

const initialState = {
  usersAPI: []
};

const fetchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_USERS:
      return {
        usersAPI: [...action.payload],
      };

    default:
      return state;
  }
}

export default fetchUsersReducer;