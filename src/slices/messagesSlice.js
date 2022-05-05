import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, { payload }) => {
      payload.forEach((message) => {
        state.push(message);
      });
    },
  },
});

export const { getMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
