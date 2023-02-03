import React from 'react';
import './TextError.scss';

interface IProps {
  children?: JSX.Element | string | React.ReactNode;
}

const TextError: React.FunctionComponent<{}> = ({ children }: IProps) => {
  return <div className='error'>{children}</div>;
};

export default TextError;
