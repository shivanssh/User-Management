import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Input from '../Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import CustomButton from './../CustomButton/CustomButton';
import {
  addUserRequested,
  updateUserRequested,
} from '../../redux/features/usersSlice';
import './FormikContainer.scss';
import { useAppSelector } from '../../hooks/dispatchSelection';
import { User } from '../../types';
import { formValidationSchema } from './../../utils/usersSchemaValidation';
import { useAppDispatch } from './../../hooks/dispatchSelection';
import Loader from '../Loader/Loader';

const FormikContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, error, isLoading, isUsersUpdated } = useAppSelector(
    (state) => state.users
  );

  const initialValues: Partial<User> = {
    name: '',
    email: '',
    address: '',
  };
  const [currentUser, setCurrentUser] = useState(initialValues);
  const isEdit = Boolean(id);

  useEffect(() => {
    const user = users.find((user: User) => user.id === Number(id));

    if (user && Object.keys(user).length) {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [id]);

  useEffect(() => {
    if (isEdit) {
      const user = localStorage.getItem('user');
      user && setCurrentUser(JSON.parse(user));
    }
  }, []);

  const onSubmit = (values: any) => {
    if (isEdit) {
      dispatch(updateUserRequested(values));
    } else {
      dispatch(addUserRequested(values));
    }
  };

  useEffect(() => {
    if (isEdit) {
      if (error) {
        toast.error('Error while updating user!', { toastId: 'error' });
      }
      if (isUsersUpdated) {
        console.log(isUsersUpdated, '--------isusersupdated');
        navigate('/');
        // setTimeout(() => navigate('/'), 500);
        toast.success('User updated successfully!', { toastId: 'addUser' });
      }
    } else {
      if (error) {
        toast.error('Error while adding user!', { toastId: 'error' });
      }
      if (isUsersUpdated) {
        navigate('/');

        // setTimeout(() => navigate('/'), 500);
        toast.success('User added successfully!', { toastId: 'updateUser' });
      }
    }
  }, [error, isUsersUpdated]);

  return (
    <>
      {!isLoading ? (
        <div className='formik-container'>
          <h2 className='heading'> {isEdit ? 'Update User' : 'Add User'}</h2>
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
                    {isEdit ? 'Update' : 'Add'}
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default FormikContainer;
