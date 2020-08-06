import * as repoListActions from '../actions/repoListActions';

const INITIAL_STATE = {
  UserRepoList: [],
}

function repoListReducer(state = INITIAL_STATE, action){
  switch(action.type){
    case(repoListActions.SET_USER_REPO_LIST):
      return{...state, UserRepoList: action.payload};
      default:
        return state;
  }
  
}

export default repoListReducer; 