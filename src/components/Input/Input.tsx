import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from '../TextError/TextError';
import './Input.scss';

type Props = {
  name: string;
  label: string;
  type: string;
};

const Input = ({ name, label, ...rest }: Props) => {
  return (
    <div className='form-control'>
      <label htmlFor={name} className='input-label'>
        {label}
      </label>
      <Field name={name} id={name} {...rest} className='input-field' />

      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
