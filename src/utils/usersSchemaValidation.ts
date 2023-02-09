import * as Yup from 'yup';

export const formValidationSchema = Yup.object({
  name: Yup.string().min(3).required('Required'),
  age: Yup.number()
    .required('Required')
    .test((value) => value! > 0),
  email: Yup.string().email('Invalid Email Format').required('Required'),
  address: Yup.string().min(3).required('Required'),
});
