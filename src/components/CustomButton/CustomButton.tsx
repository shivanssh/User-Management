import React from 'react';
import './CustomButton.scss';

interface IProps {
  children: string | JSX.Element;
  [key: string]: any;
}

const CustomButton = ({ children, ...rest }: IProps) => {
  return (
    <button {...rest} className='custom-button'>
      {children}
    </button>
  );
};

export default CustomButton;
