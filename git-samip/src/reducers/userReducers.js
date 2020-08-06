import * as userActions from '../actions/userActions';

const INITIAL_STATE = {
  UserData: {},
}

function userReducer(state = INITIAL_STATE, action){
  switch(action.type){
    case(userActions.SET_USER_DATA):
      return{...state, UserData: action.payload};
      default:
        return state;
  }
  
}

export default userReducer; 