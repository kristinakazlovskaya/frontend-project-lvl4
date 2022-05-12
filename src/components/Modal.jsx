import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import { hideModal } from '../slices/modalSlice.js';

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

const Modal = () => {
  const modalInfo = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  if (!modalInfo.type) {
    return null;
  }

  const Component = modals[modalInfo.type];

  return <Component onHide={() => dispatch(hideModal())} />;
};

export default Modal;
