import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users', async (page) => {
  const res = await fetch(`http://127.0.0.1:7000/users?page=${page}`);
  return res.json();
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
      data: [],
      page: 0,
      isFull: false,
      status: undefined
    },  
    reducers: {},
    extraReducers: {
      [fetchUsers.fulfilled]: (state, action) => {
        return {
          data: [...state.data, ...action.payload.data.data],
          page: action.payload.page,
          isFull: action.payload.isFull,
          status: "success"
        }
      },
      [fetchUsers.pending]: (state, action) => {
        return {
          data: state.data,
          page: state.page,
          isFull: state.isFull,
          status: "loading"
        }
      },
      [fetchUsers.rejected]: (state, action) => {
        return {
          data: state.data,
          page: state.page,
          isFull: state.isFull,
          status: "error"
        }
      }
    }
  
  })

  export default usersSlice.reducer
