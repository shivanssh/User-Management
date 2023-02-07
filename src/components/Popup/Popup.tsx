import React from 'react';
import './Popup.scss';
import CustomButton from './../CustomButton/CustomButton';

interface IProps {
  title: string;
  showPopup: boolean;
  deleteConfirmation: (isConfirmed: boolean) => void;
  onClose: () => void;
}

const Popup = ({ title, deleteConfirmation, onClose, showPopup }: IProps) => {
  if (!showPopup) return null;
  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <span className='title'>{title}</span>
        <div className='popup-buttons'>
          <CustomButton onClick={() => deleteConfirmation(true)}>
            Yes
          </CustomButton>
          <CustomButton onClick={() => deleteConfirmation(false)}>
            No
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Popup;
