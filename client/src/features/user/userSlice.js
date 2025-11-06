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

// Login User
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

// Load User
export const loaduser = createAsyncThunk("user/loadUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios(`/api/v1/profile`);

    return data;
  } catch (error) {
    console.log("Login Err:", error);
    return rejectWithValue(error.response?.data.message || "Load User Failed");
  }
});

// Logout User
export const logoutUser = createAsyncThunk("user/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/api/v1/logout`);
    console.log("Logout data", data);

    return data;
  } catch (error) {
    console.log("Logout Err:", error);
    return rejectWithValue(error.response?.data.message || "Load User Failed");
  }
});

// Update User
export const updateUser = createAsyncThunk("user/updateUser", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/api/v1/profile/update`, payload.formData);
    console.log("Updated User Data", data);

    return data;
  } catch (error) {
    console.log("Updated User Err:", error);
    return rejectWithValue(error.response?.data.message || "Updated User Failed");
  }
});

// Update User Password
export const updatePassword = createAsyncThunk("user/updatePassword", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/api/v1/password/update`, payload.formData);
    console.log("Updated User password", data);

    return data;
  } catch (error) {
    console.log("Update Password Err:", error);
    return rejectWithValue(error.response?.data.message || "Update Password Failed");
  }
});

// Forgot User Password
export const forgotPassword = createAsyncThunk("user/forgotPassword", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/api/v1/password/forgot`, payload.payload);
    console.log("Forgot User password", data);

    return data;
  } catch (error) {
    console.log("Forgot Password Err:", error);
    return rejectWithValue(error.response?.data.message || "Send Forgot Password Failed");
  }
});

// Reset User Password
export const resetPassword = createAsyncThunk("user/resetPassword", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/api/v1/reset/${payload.token}`, payload.data);
    console.log("Forgot User password", data);

    return data;
  } catch (error) {
    console.log("Forgot Password Err:", error);
    return rejectWithValue(error.response?.data.message || "Send Forgot Password Failed");
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
    message: null,
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
      state.loading = true;
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

    //? Load User
    builders.addCase(loaduser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(loaduser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload?.user || null;
      state.isAuthenticated = Boolean(action.payload?.user);
    });

    builders.addCase(loaduser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Load user failed";
      state.user = null;
      state.isAuthenticated = false;
    });

    //? Logout User
    builders.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.success = false;
      state.isAuthenticated = false;
    });

    builders.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Logout user failed";
      state.user = null;
      state.isAuthenticated = false;
    });

    //? Update User
    builders.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(updateUser.fulfilled, (state, action) => {
      console.log("updateActionPayload:", action.payload);

      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.success = action.payload.success;
      state.isAuthenticated = Boolean(action.payload?.user);
    });

    builders.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Update User failed";
      state.user = null;
      state.isAuthenticated = false;
    });

    //? Update User Password
    builders.addCase(updatePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(updatePassword.fulfilled, (state, action) => {
      console.log("updateActionPayload:", action.payload);

      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.success = action.payload.success;
      state.isAuthenticated = Boolean(action.payload?.user);
    });

    builders.addCase(updatePassword.rejected, (state, action) => {
      console.log("updatePasswordPayload:", action.payload);

      state.loading = false;
      state.error = action.payload || "Update Password Failed";
    });

    //? Forgot User Password
    builders.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(forgotPassword.fulfilled, (state, action) => {
      console.log("ForgotActionPayload:", action.payload);

      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.isAuthenticated = Boolean(action.payload?.user);
    });

    builders.addCase(forgotPassword.rejected, (state, action) => {
      console.log("updatePasswordPayload:", action.payload);

      state.loading = false;
      state.error = action.payload || "Update Password Failed";
    });

    //? Reset User Password
    builders.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builders.addCase(resetPassword.fulfilled, (state, action) => {
      console.log("ResetActionPayload:", action.payload);

      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.user = null;
      state.isAuthenticated = Boolean(action.payload?.user);
    });

    builders.addCase(resetPassword.rejected, (state, action) => {
      console.log("ResetActionPayload:", action.payload);

      state.loading = false;
      state.error = action.payload || "Reset Password Failed";
    });
  },
});

export const { removeError, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
