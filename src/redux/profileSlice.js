import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProfile = createAsyncThunk('profile', async (id) => {
  
  const res = await fetch(`http://127.0.0.1:7000/profile/${id}`);
  return res.json();
})

export const fetchProfilePost = createAsyncThunk('profile/post', async (param) => {
  console.log("param.page "+param.page);
  const res = await fetch(`http://127.0.0.1:7000/profile/${param.id}/posts?page=${param.page}`);
  return res.json();
})

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
      data: {},
      posts: {
        data: [],
        page: 0,
        isFull: false,
      },
      status: undefined
    },  
    reducers: {},
    extraReducers: {
      [fetchProfile.fulfilled]: (state, action) => {
        return {
          data: action.payload.profile,
          posts: action.payload.posts.data,
          status: "success"
        }
      },
      [fetchProfilePost.fulfilled]: (state, action) => {
        return {
          data: state.data,
          posts: {
            data: [...state.posts.data, ...action.payload.data.data],
            page: action.payload.page,
            isFull: action.payload.isFull
          },
          status: "success"
        }
      },
      [fetchProfile.pending]: (state, action) => {
        return {
          data: state.data,
          posts: state.posts,
          status: "loading"
        }
      },
      [fetchProfile.rejected]: (state, action) => {
        return {
          data: state.data,
          posts: state.posts,
          status: "error"
        }
      },
      
    }
  
  })

  export default profileSlice.reducer
  