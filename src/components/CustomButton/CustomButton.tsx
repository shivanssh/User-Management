import React from 'react';
const CustomButton = ({ children, ...rest }: any) => {
  return (
    <button {...rest} className='customButton'>
      {children}
    </button>
  );
};

export default CustomButton;
