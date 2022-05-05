/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { channels: [], currentChannelId: 1 };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels: (state, { payload }) => {
      payload.forEach((channel) => {
        state.channels.push(channel);
      });
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const { getChannels, setCurrentChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
