import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifyerror } from "../../components/notify";
import Api from "../../config/api";
export const fetchBlogData = createAsyncThunk(
  "blogs/fetchBlogData",
  async (_, thunkApi) => {
 try {
   let response = await Api.get("/blogs/myblogs");
   console.log(response);
   return response.data;
 } catch (error) {
   let errorMessage =
     error?.response?.data?.message || error.response?.data?.error;
   notifyerror(errorMessage);
   return thunkApi.rejectWithValue(errorMessage);
 }
  }
);
export const fetchallBlogData = createAsyncThunk(
  "blogs/fetchallBlogData",
  async (_, thunkApi) => {
    try {
      let response = await Api.get("/blogs/allblog");
      console.log(response);
      return response.data;
    } catch (error) {
      let errorMessage =
        error?.response?.data?.message || error.response?.data?.error;
      notifyerror(errorMessage);
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);


export const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    data: [],
    alldata:[],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogData.fulfilled, (state, actions) => {
      state.data = actions.payload;
    });
    builder.addCase(fetchallBlogData.fulfilled, (state, actions) => {
      state.alldata = actions.payload;
    });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = blogSlice.actions;

export default blogSlice.reducer;
