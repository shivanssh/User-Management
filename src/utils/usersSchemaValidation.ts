import * as Yup from 'yup';

export const formValidationSchema = Yup.object({
  name: Yup.string().min(3).required('Required'),
  email: Yup.string().email('Invalid Email Format').required('Required'),
  address: Yup.string().min(3).required('Required'),
});
