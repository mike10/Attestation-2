import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('posts', async (page) => {
  const res = await fetch("http://127.0.0.1:7000/posts");
  return res.json();
})

export const fetchComments = createAsyncThunk('comments', async (id) => {
  const res = await fetch( `http://127.0.0.1:7000/comments?id=${id}`);
  return res.json();
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
      data: [],
      page: 0,
      total: 21,
      comments: [],
      status: undefined
    },  
    reducers: {},
    extraReducers: {
      [fetchPosts.fulfilled]: (state, action) => {
        return {
          data: [...state.data, ...action.payload.data],
          //page: state.page+1,
          //total: action.payload.total,
          comments: state.comments,
          status: "success"
        }
      },
      [fetchPosts.pending]: (state, action) => {
        return {
          data: state.data,
          //page: state.page,
          //total: state.total,
          comments: state.comments,
          status: "loading"
        }
      },
      [fetchPosts.rejected]: (state, action) => {
        return {
          data: state.data,
          //page: state.page,
          //total: state.total,
          comments: state.comments,
          status: "error"
        }
      },
      [fetchComments.fulfilled]: (state, action) => {
        console.log(action);
        return {
          data: state.data,
          //page: state.page,
          //total: state.total,
          comments: action.payload.data,
          status: "success"
        }
      },
      [fetchComments.pending]: (state, action) => {
        return {
          data: state.data,
          //page: state.page,
          //total: state.total,
          comments: state.comments,
          status: "loading"
        }
      },
      [fetchComments.rejected]: (state, action) => {
        return {
          data: state.data,
          //page: state.page,
          //total: state.total,
          comments: state.comments,
          status: "error"
        }
      }
    }
  
  })

  export default postsSlice.reducer
