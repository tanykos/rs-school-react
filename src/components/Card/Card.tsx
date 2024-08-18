import './Card.scss';
import { InputsData } from '../../types';

interface CardProps {
  inputsData: InputsData;
}

export default function Card({ inputsData }: CardProps) {
  return (
    <div className="card">
      <p className="cardRow">
        <span className="cardLabel">Name: </span>
        {inputsData.name}
      </p>
      <p className="cardRow">
        <span className="cardLabel">Age: </span>
        {inputsData.age}
      </p>
      <p className="cardRow">
        <span className="cardLabel">Email: </span>
        {inputsData.email}
      </p>
      <p className="cardRow">
        <span className="cardLabel">Password: </span>
        {inputsData.password}
      </p>
      <p className="cardRow">
        <span className="cardLabel">Gender: </span>
        {inputsData.gender}
      </p>
      <p className="cardRow">
        <span className="cardLabel">Terms Accepted: </span>
        {inputsData.termsAccepted ? 'Yes' : 'No'}
      </p>
      <p className="cardRow">
        <span className="cardLabel">Country: </span>
        {inputsData.country}
      </p>
      <p>
        <span className="cardLabel">Image: </span>
        {inputsData.image ? <img src={inputsData.image} alt="Uploaded" className="image" /> : 'not provided'}
      </p>
    </div>
  );
}
