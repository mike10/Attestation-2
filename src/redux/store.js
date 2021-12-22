import { configureStore } from '@reduxjs/toolkit'

import usersReducer from "./usersSlice"
import postsReducer from "./postsSlice"
import profileReducer from "./profileSlice"
import signReducer from './signSlice'
import changeTheme from './changeTheme'

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    profile: profileReducer,
    sign: signReducer,
    theme: changeTheme
  }
})