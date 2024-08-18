import * as yup from 'yup';
const imageExtensions = ['.png', '.jpeg'];

export const getSchema = (countries: string[]) =>
  yup.object().shape({
    name: yup.string().matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase letter'),
    age: yup
      .number()
      .typeError('Age must be a number')
      .positive('Age must be positive number')
      .integer('Age must be an integer')
      .required('Required field'),
    email: yup
      .string()
      .required('Required field')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email'),
    password: yup
      .string()
      .required('Required field')
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain 1 number, 1 uppercase, 1 lowercase and 1 special character',
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Required field'),
    gender: yup.string().required('Gender is required field'),
    termsAccepted: yup.bool().oneOf([true], 'You must accept the terms').required('Required field'),
    country: yup.string().oneOf(countries, 'Country must be selected from the list').required('Country is required'),
    image: yup
      .mixed<File[]>()
      .test('fileSize', 'Max allowed size is 1MB', (file) => {
        if (!file?.length) return true;
        return file[0].size <= 1000000;
      })
      .test('fileType', 'Unsupported File Format', (file) => {
        if (!file?.length) return true;
        return imageExtensions.some((ext) => file[0].name.endsWith(ext));
      }),
  });
