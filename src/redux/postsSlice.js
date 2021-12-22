import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('posts', async (page) => {
  const res = await fetch(`http://127.0.0.1:7000/posts?page=${page}`);
  return res.json();
})

export const fetchComments = createAsyncThunk('comments', async (param) => {
  console.log(param);
  const res = await fetch( `http://127.0.0.1:7000/comments?id=${param.id}&page=${param.page}`);
  return res.json();
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
      data: [],
      page: 0,
      isFull: false,
      comments: {
        data: [],
        page: 0,
        isFull: false
      },
      status: undefined
    },  
    reducers: {
      resetPage: (state) => {
        return{
          ...state,
          comments:{
            data: [],
            page: 0,
            isFull: false
          }
        }
      }
    },
    extraReducers: {
      [fetchPosts.fulfilled]: (state, action) => {
        let isfull = action.payload.data?.isFull
        if(isfull){
          return {
            data: state.data,
            page: state.page,
            isFull: false,
            comments: [],
            status: "success"
          }
        }
        return {
          data: [...state.data, ...action.payload.data],
          page: action.payload.page,
          isFull: state.isFull,
          comments: {
            data: [],
            page: 0,
            isFull: false
          },
          status: "success"
        }
      },
      [fetchPosts.pending]: (state, action) => {
        return {
          data: state.data,
          page: state.page,
          isFull: state.isFull,
          comments: state.comments,
          status: "loading"
        }
      },
      [fetchPosts.rejected]: (state, action) => {
        return {
          data: state.data,
          page: state.page,
          isFull: state.isFull,
          comments: state.comments,
          status: "error"
        }
      },
      [fetchComments.fulfilled]: (state, action) => {
        console.log(action.payload);
        return {
          data: state.data,
          page: state.page,
          isFull: state.isFull,
          comments: {
            data: [...state.comments.data, ...action.payload.data.data],
            page: action.payload.page,
            isFull: action.payload.isFull
          },
          status: "success"
        }
      },
      [fetchComments.pending]: (state, action) => {
        return {
          data: state.data,
          page: state.page,
          isFull: state.isFull,
          comments: state.comments,
          status: "loading"
        }
      },
      [fetchComments.rejected]: (state, action) => {
        return {
          data: state.data,
          page: state.page,
          isFull: state.isFull,
          comments: state.comments,
          status: "error"
        }
      }
    }
  
  })

  export const { resetPage } = postsSlice.actions

  export default postsSlice.reducer
