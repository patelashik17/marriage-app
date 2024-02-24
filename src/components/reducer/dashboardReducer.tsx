import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationState {
  isLoginData: any[];
  useData: any[];
  userDetails: any[];
}

const initialState: ApplicationState = {
  isLoginData: [],
  useData: [],
  userDetails: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setLoginDatas: (state, action: PayloadAction<any[]>) => {
      state.isLoginData = action.payload;
    },
    setUserDatas: (state, action: PayloadAction<any[]>) => {
      state.useData = action.payload;
    },
  },
});

export const { setLoginDatas } = applicationSlice.actions;
export const { setUserDatas } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
