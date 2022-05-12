/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

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
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      state = state.filter((m) => m.channelId !== payload);
    });
  },
});

export const { getMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
