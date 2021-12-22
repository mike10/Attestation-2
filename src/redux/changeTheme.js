import { createSlice } from '@reduxjs/toolkit'

const changeTheme = createSlice({
    name: 'theme',
    initialState: {
      value: "white"
    },  
    reducers: {
        onChangeTheme:(state) => {
           if(state.value === "white"){
              document.body.style = "background-color: #555"
                return { value:"dark" }    
           }
           document.body.style = "background-color: #f2f2f2"
           return { value: "white" }
        }
    },
    
  
  })

  export const { onChangeTheme } = changeTheme.actions
  
  export default changeTheme.reducer
