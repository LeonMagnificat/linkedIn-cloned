import {
  ConfigureStore,
  CombineReducers,
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit'
import userReducer from '../reducer/userReducer'
import experienceReducer from '../reducer/experienceReducer'
import postsReducer from '../reducer/postsReducer'
import localStorage from 'redux-persist/lib/storage'

const mainReducer = combineReducers({
  user: userReducer,
  experience: experienceReducer,
  posts: postsReducer,
})

const persistConfig = {
  key: 'root',
  storage: localStorage,
}

export const store = configureStore({ reducer: mainReducer })
