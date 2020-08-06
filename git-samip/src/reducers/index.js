import { combineReducers } from 'redux';

import repoListReducer from './repoListReducers'
import userReducer from './userReducers'

const reducer = combineReducers({
  userRepos: repoListReducer,
  user: userReducer
})

export default reducer;