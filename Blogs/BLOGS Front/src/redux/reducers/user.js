import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifyerror } from "../../components/notify";
import Api from "../../config/api";
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkApi) => { 
    try {
       let response=await Api.get("/profile")
      return response.data;
      
    } catch (error) {
      let errorMessage = error?.response?.data?.message || error.response?.data?.error
      notifyerror(errorMessage)
      return thunkApi.rejectWithValue(errorMessage)
    }
  }
)
export const logoutuser = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkApi) => { 
    try {
       let response=await Api.delete("/logout")
      return response.data;
      
    } catch (error) {
      let errorMessage = error?.response?.data?.message || error.response?.data?.error
      notifyerror(errorMessage)
      return thunkApi.rejectWithValue(errorMessage)
    }
  }
)



export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    islogin: false,
        
  },
  reducers: {
    login: (state) => {

      state.islogin = true;
    },
    logout: (state) => {
      state.islogin = false;
    },

  }, extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, actions) => {
      state.data = actions.payload;
      state.islogin = true;

    })
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
