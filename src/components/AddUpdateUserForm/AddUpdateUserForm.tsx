import React from 'react';
import CustomButton from './../CustomButton/CustomButton';
import Input from '../Input/Input';
import { Formik, Form, FormikValues } from 'formik';
import { useNavigate } from 'react-router-dom';

interface IProps {
  formik: FormikValues;
  isEdit: boolean;
}

const AddUpdateUserForm = ({ formik, isEdit }: IProps) => {
  const navigate = useNavigate();
  return (
    <Form>
      <div className='form-container'>
        <Input label='name' name='name' type='text' />
        <Input label='email' name='email' type='email' />
        <Input label='age' name='age' type='text' />
        <Input label='address' name='address' type='text' />
        <div className='button-options'>
          <CustomButton type='submit' disabled={!formik.isValid}>
            {isEdit ? 'Update' : 'Add'}
          </CustomButton>
          <CustomButton onClick={() => navigate('/')}>Back</CustomButton>
        </div>
      </div>
    </Form>
  );
};

export default AddUpdateUserForm;
