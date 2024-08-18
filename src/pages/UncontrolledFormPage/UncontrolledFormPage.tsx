import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addForm } from '../../store/formsDataSlice';
import { useAppDispatch } from '../../store/reduxHooks';
import { InputsData } from '../../types';
import countries from '../../data/countries';

export default function UncontrolledFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: InputsData = Object.fromEntries(formData.entries());
    const image = formData.get('image') as File;
    const reader = new FileReader();

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

  return (
    <>
      <header className="header">
        <h1>Uncontrolled Form</h1>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit} autoComplete="off" className="form">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input id="name" name="name" className="input" />
          <label htmlFor="age" className="label">
            Age:
          </label>
          <input id="age" type="number" name="age" className="input" />
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input id="email" type="email" name="email" className="input" />
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input id="password" type="password" name="password" className="input" />
          <label htmlFor="confirmPassword" className="label">
            Confirm Password:
          </label>
          <input id="confirmPassword" type="password" name="confirmPassword" className="input" />
          <label className="label">Gender:</label>
          <div className="radioWrap">
            <label>
              <input type="radio" name="gender" value="male" className="input" /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" className="input" /> Female
            </label>
          </div>
          <label htmlFor="terms" className="label">
            <input id="terms" type="checkbox" name="termsAccepted" className="input checkbox" />
            Accept Terms and Conditions
          </label>
          <label htmlFor="country" className="label">
            Country:
          </label>
          <input list="country-list" id="country" name="country" className="input" />

          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>

          <label htmlFor="image" className="label">
            Upload Image:
          </label>
          <input id="image" type="file" name="image" accept=".png, .jpeg" className="inputFile" />

          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
