/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { channels: [], currentChannelId: 1 };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels: (state, { payload }) => {
      state.channels = payload;
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload);
      state.currentChannelId = 1;
    },
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find((ch) => ch.id === payload.id);
      channel.name = payload.name;
    },
  },
});

export const {
  getChannels,
  setCurrentChannelId,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
