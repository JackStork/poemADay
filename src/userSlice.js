import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    update: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
