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
    addMessage: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { getMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
