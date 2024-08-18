import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addForm } from '../../store/formsDataSlice';
import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { InputsData } from '../../types';
import { getSchema } from '../../utils/validation';
import { ValidationError } from 'yup';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';

export default function UncontrolledFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const passwordRef = useRef<HTMLInputElement>(null);
  const countries = useAppSelector((state) => state.countries);
  const schema = getSchema(countries);

  const validateFormData = async (data: InputsData) => {
    try {
      await schema.validate(data, { abortEarly: false });
      return { isValid: true, errors: {} };
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        return { isValid: false, errors };
      } else {
        throw err;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: InputsData = Object.fromEntries(formData.entries());
    const image = formData.get('image') as File;
    const reader = new FileReader();

    data.termsAccepted = formData.has('termsAccepted') && formData.get('termsAccepted') === 'on';
    if (image && image.name !== '') {
      data.image = [image];
    } else {
      data.image = [];
    }

    const validation = await validateFormData(data);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (image.name !== '') {
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        data.image = base64Image;
        dispatch(addForm(data));
        navigate('/');
      };
      reader.readAsDataURL(image);
    } else {
      delete data.image;
      dispatch(addForm(data));
      navigate('/');
    }
  };

  const getPasswordValue = () => {
    return passwordRef.current?.value || '';
  };

  return (
    <>
      <header className="header">
        <h1>Uncontrolled Form</h1>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit} autoComplete="off" className="form" noValidate>
          <label htmlFor="name" className="label">
            Name*
          </label>
          <div className="inputWrap">
            <input id="name" name="name" className="input" />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <label htmlFor="age" className="label">
            Age*
          </label>
          <div className="inputWrap">
            <input id="age" name="age" className="input" />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          <label htmlFor="email" className="label">
            Email*
          </label>
          <div className="inputWrap">
            <input id="email" type="email" name="email" className="input" />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <label htmlFor="password" className="label">
            Password*
          </label>
          <div className="inputWrap">
            <div>
              <PasswordStrength password={getPasswordValue()} />
              <input id="password" type="password" name="password" className="input" ref={passwordRef} />
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <label htmlFor="confirmPassword" className="label">
            Confirm Password*
          </label>
          <div className="inputWrap">
            <input id="confirmPassword" type="password" name="confirmPassword" className="input" />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <label className="label">Gender*</label>
          <div className="radioWrap inputWrap">
            <label>
              <input type="radio" name="gender" value="male" className="input" /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" className="input" /> Female
            </label>
            {errors.gender && <p className="error errorHigh">{errors.gender}</p>}
          </div>

          <div className="inputWrap">
            <label htmlFor="terms" className="label">
              <input id="terms" type="checkbox" name="termsAccepted" className="input checkbox" />
              Accept Terms and Conditions*
            </label>
            {errors.termsAccepted && <p className="error errorHigh">{errors.termsAccepted}</p>}
          </div>

          <label htmlFor="country" className="label">
            Country*
          </label>
          <div className="inputWrap">
            <input list="country-list" id="country" name="country" className="input" />

            <datalist id="country-list">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
            {errors.country && <p className="error">{errors.country}</p>}
          </div>

          <label htmlFor="image" className="label">
            Upload Image:
          </label>
          <div className="inputWrap">
            <input id="image" type="file" name="image" className="inputFile" />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>

          <button type="submit" className="w-100">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
