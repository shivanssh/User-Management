import React, { useState } from 'react';
import { Formik, Form, FormikProps, FormikValues } from 'formik';
import Input from '../Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import CustomButton from './../CustomButton/CustomButton';
import { addUserRequested, updateUser } from '../../redux/features/usersSlice';
import './FormikContainer.scss';
import { useAppSelector } from '../../hooks/dispatchSelection';
import { User } from '../../types';
import { formValidationSchema } from './../../utils/usersSchemaValidation';
import { useAppDispatch } from './../../hooks/dispatchSelection';

const FormikContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const initialValues: Partial<User> = {
    name: '',
    email: '',
    address: '',
  };
  const [currentUser, setCurrentUser] = useState(initialValues);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    id && setIsEditMode(true);
    const user = users.find((user: User) => user.id === Number(id));

    if (user && Object.keys(user).length) {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const user = localStorage.getItem('user');
      user && setCurrentUser(JSON.parse(user));
    }
  }, []);

  const onSubmit = (values: any, submitProp: any): void => {
    if (id) {
      dispatch(updateUser(values));
      setTimeout(() => navigate('/'), 500);
      toast.success('User updated successfully!');
    } else {
      dispatch(addUserRequested(values));
      submitProp.setSubmitting(false);
      submitProp.resetForm();
      setTimeout(() => navigate('/'), 500);
      toast.success('User added successfully!');
    }
  };

  return (
    <div className='formik-container'>
      <h2 className='heading'> {isEditMode ? 'Update User' : 'Add User'}</h2>
      <Formik
        initialValues={currentUser || initialValues}
        validationSchema={formValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <div className='form-container'>
              <Input label='name' name='name' type='text' />
              <Input label='email' name='email' type='email' />
              <Input label='address' name='address' type='text' />
              <CustomButton
                type='submit'
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {isEditMode ? 'Update' : 'Add'}
              </CustomButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikContainer;
