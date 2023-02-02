import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import CustomButton from './../CustomButton/CustomButton';
import { addUserRequested, updateUser } from '../../redux/features/usersSlice';

const FormikContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.users);
  const initialValues = {
    name: '',
    email: '',
    address: '',
  };
  const [currentUser, setCurrentUser] = useState(initialValues);

  useEffect(() => {
    const currentUser = users.filter((user: any) => user.id === Number(id));
    setCurrentUser(currentUser[0]);
    console.log('current user', currentUser);
    if (currentUser.length)
      localStorage.setItem('user', JSON.stringify(currentUser[0]));
  }, [id, users]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    user && setCurrentUser(JSON.parse(user));
    console.log(user, '--------user');
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid Email Format').required('Required'),
    address: Yup.string().required('Required'),
  });

  const onSubmit = (values: any, submitProp: any) => {
    if (values.id) {
      console.log(values, '---form   ');
      console.log('---------update request', values);
      dispatch(updateUser(values));
      setTimeout(() => navigate('/'), 500);
      toast.success('User updated successfully!');
    } else {
      console.log('Form Values', values);
      dispatch(addUserRequested(values));
      submitProp.setSubmitting(false);
      submitProp.resetForm();
      setTimeout(() => navigate('/'), 500);
      toast.success('User added successfully!');
    }
  };

  return (
    <Formik
      initialValues={currentUser || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form>
          <Input label='name' name='name' type='text' />
          <Input label='email' name='email' type='email' />
          <Input label='address' name='address' type='text' />
          <CustomButton
            type='submit'
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Add
          </CustomButton>
          <CustomButton onClick={() => navigate('/')}>Back</CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
