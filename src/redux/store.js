import { configureStore } from '@reduxjs/toolkit'

import usersReducer from "./usersSlice"
import postsReducer from "./postsSlice"
import profileReducer from "./profileSlice"
import profilePostsReducer from './profilePostsSlice'
import signReducer from './signSlice'


export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    profile: profileReducer,
    profilePosts: profilePostsReducer,
    sign: signReducer
  }
})