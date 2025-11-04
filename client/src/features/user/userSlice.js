import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register User

export const registerUser = createAsyncThunk("user/registerUser", async (payload, { rejectWithValue }) => {
  try {
    if (payload.customError) {
      return rejectWithValue(payload.customError);
    }

    const { data } = await axios.post(`/api/v1/register`, payload.formData);

    // console.log("data:", data);

    return data;
  } catch (error) {
    console.log("RegisterUserErr:", error);
    return rejectWithValue(error.response?.data.message || "Registration failed");
  }
});

export const loginUser = createAsyncThunk("user/loginUser", async (payload, { rejectWithValue }) => {
  try {
    if (payload.customError) {
      return rejectWithValue(payload.customError);
    }

    const { data } = await axios.post(`/api/v1/login`, payload.formData);

    return data;
  } catch (error) {
    console.log("Login Err:", error);
    return rejectWithValue(error.response?.data.message || "Login failed");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
  },
  reducers: {
    removeError: (state) => void (state.error = null),
    removeSuccess: (state) => void (state.success = false),
  },
  extraReducers: (builders) => {
    builders.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.user = action.payload?.user || null;
      state.isAuthenticated = Boolean(action.payload?.user);
    });

    builders.addCase(registerUser.rejected, (state, action) => {
      console.log(action);

      state.loading = false;
      state.error = action.payload || "Registration failed";
      state.user = null;
      state.isAuthenticated = false;
    });

    //? Login user
    builders.addCase(loginUser.pending, (state) => {
      state.loading = false;
      state.error = null;
    });

    builders.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.user = action.payload?.user || null;
      state.isAuthenticated = Boolean(action.payload?.user);
    });

    builders.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { removeError, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
