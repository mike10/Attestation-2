import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProfilePosts = createAsyncThunk('profileposts', async (id) => {
  
  const res = await fetch(`http://127.0.0.1:7000/profileposts?id=${id}`);
  return res.json();
})


const profilePostsSlice = createSlice({
    name: 'profilePosts',
    initialState: {
      data: [],
      status: undefined
    },  
    reducers: {},
    extraReducers: {
      [fetchProfilePosts.fulfilled]: (state, action) => {
        return {
          data: action.payload.data,
          status: "success"
        }
      },
      [fetchProfilePosts.pending]: (state, action) => {
        return {
          data: state.data,
          status: "loading"
        }
      },
      [fetchProfilePosts.rejected]: (state, action) => {
        return {
          data: state.data,
          status: "error"
        }
      }
    }
  
  })

  export default profilePostsSlice.reducer
