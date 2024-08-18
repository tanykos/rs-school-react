import { useForm } from 'react-hook-form';
import countries from '../../data/countries';
import { useAppDispatch } from '../../store/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { addForm } from '../../store/formsDataSlice';

export default function HookFormPage() {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const file = data.image[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      const finalData = { ...data, image: base64Image };
      dispatch(addForm(finalData));
      navigate('/');
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete data.image;

      dispatch(addForm(data));
      navigate('/');
    }
  });

  return (
    <>
      <header className="header">
        <h1>React Hook Form</h1>
      </header>
      <main className="main">
        <form onSubmit={onSubmit} autoComplete="off" className="form">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input id="name" {...register('name')} className="input" />
          <label htmlFor="age" className="label">
            Age:
          </label>
          <input id="age" {...register('age')} type="number" className="input" />
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input id="email" {...register('email')} type="email" className="input" />
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input id="password" {...register('password')} type="password" className="input" />
          <label htmlFor="confirmPassword" className="label">
            Confirm Password:
          </label>
          <input id="confirmPassword" {...register('confirmPassword')} type="password" className="input" />
          <label className="label">Gender:</label>
          <div className="radioWrap">
            <label>
              <input {...register('gender')} type="radio" value="male" className="input" /> Male
            </label>
            <label>
              <input {...register('gender')} type="radio" value="female" className="input" /> Female
            </label>
          </div>
          <label htmlFor="terms" className="label">
            <input id="terms" {...register('termsAccepted')} type="checkbox" className="input checkbox" />
            Accept Terms and Conditions
          </label>
          <label htmlFor="country" className="label">
            Country:
          </label>
          <input id="country" {...register('country')} list="country-list" className="input" />

          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>

          <label htmlFor="image" className="label">
            Upload Image:
          </label>
          <input id="image" {...register('image')} type="file" accept=".png, .jpeg" className="inputFile" />

          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
