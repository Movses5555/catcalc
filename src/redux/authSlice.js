
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Logout, SignIn, SignUp, fetchUserData } from '../api';


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(signInAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.user = null;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const user = action.payload.data;
        state.user = user;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const signUpAsync = createAsyncThunk('auth/signUp', async (formData, thunkAPI) => {
  try {
    const response = await SignUp(formData);
    const token = response.data.token;
    localStorage.setItem('token', token);
    setTimeout(() => {
      window.location.pathname = '/';
    }, 100)
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const signInAsync = createAsyncThunk('auth/signIn', async (formData, thunkAPI) => {
  try {
    const response = await SignIn(formData);
    const token = response.data.token;
    localStorage.setItem('token', token);
    window.location.pathname = '/';
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await Logout();
    localStorage.removeItem('token');
    window.location.pathname = '/sign-in';
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkAPI) => {
  try {
    const response = await fetchUserData();
    return response;
  } catch(error) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message);
  }
});

export default authSlice.reducer;
