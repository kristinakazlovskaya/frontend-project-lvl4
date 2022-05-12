/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { type: null, id: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.type = null;
      state.id = null;
    },
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.id = payload.id ?? null;
    },
  },
});

export const { hideModal, showModal } = modalSlice.actions;

export default modalSlice.reducer;
