import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { addForm } from '../../store/formsDataSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';

const imageExtensions = ['.png', '.jpeg'];

const getSchema = (countries: string[]) =>
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

export default function HookFormPage() {
  const countries = useAppSelector((state) => state.countries);
  const schema = getSchema(countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const password = watch('password', '');

  const onSubmit = handleSubmit((data) => {
    const file = data.image;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      const finalData = { ...data, image: base64Image };
      dispatch(addForm(finalData));
      navigate('/');
    };
    if (file?.length) {
      reader.readAsDataURL(file[0]);
    } else {
      const finalData = { ...data, image: '' };

      dispatch(addForm(finalData));
      navigate('/');
    }
  });

  return (
    <>
      <header className="header">
        <h1>React Hook Form</h1>
      </header>
      <main className="main">
        <form onSubmit={onSubmit} autoComplete="off" className="form" noValidate>
          <label htmlFor="name" className="label">
            Name*
          </label>
          <div className="inputWrap">
            <input id="name" {...register('name')} className="input" />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <label htmlFor="age" className="label">
            Age*
          </label>
          <div className="inputWrap">
            <input id="age" {...register('age')} className="input" />
            {errors.age && <p className="error">{errors.age.message}</p>}
          </div>

          <label htmlFor="email" className="label">
            Email*
          </label>
          <div className="inputWrap">
            <input id="email" {...register('email')} type="email" className="input" />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <label htmlFor="password" className="label">
            Password*
          </label>
          <div className="inputWrap">
            <div>
              <PasswordStrength password={password} />
              <input id="password" {...register('password')} type="password" className="input" />
            </div>
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <label htmlFor="confirmPassword" className="label">
            Confirm Password*
          </label>
          <div className="inputWrap">
            <input id="confirmPassword" {...register('confirmPassword')} type="password" className="input" />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
          </div>

          <label className="label">Gender*</label>
          <div className="radioWrap inputWrap">
            <label>
              <input {...register('gender')} type="radio" value="male" className="input" /> Male
            </label>
            <label>
              <input {...register('gender')} type="radio" value="female" className="input" /> Female
            </label>
            {errors.gender && <p className="error errorHigh">{errors.gender.message}</p>}
          </div>

          <div className="inputWrap">
            <label htmlFor="terms" className="label">
              <input id="terms" {...register('termsAccepted')} type="checkbox" className="input checkbox" />
              Accept Terms and Conditions*
            </label>
            {errors.termsAccepted && <p className="error errorHigh">{errors.termsAccepted.message}</p>}
          </div>

          <label htmlFor="country" className="label">
            Country*
          </label>
          <div className="inputWrap">
            <input id="country" {...register('country')} list="country-list" className="input" />

            <datalist id="country-list">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
            {errors.country && <p className="error">{errors.country.message}</p>}
          </div>

          <label htmlFor="image" className="label">
            Upload Image
          </label>
          <div className="inputWrap">
            <input id="image" {...register('image')} type="file" className="inputFile" />
            {errors.image && <p className="error">{errors.image.message}</p>}
          </div>

          <button disabled={!isValid || isSubmitting} type="submit" className="w-100">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
