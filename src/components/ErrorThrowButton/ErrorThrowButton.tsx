import { useState, useEffect } from 'react';

export default function ErrorThrowButton() {
  const [throwError, setThrowError] = useState<boolean>(false);

  const triggerError = () => {
    setThrowError(true);
  };

  useEffect(() => {
    if (throwError) {
      throw new Error('Throw Error Button is clicked!');
    }
  }, [throwError]);

  return (
    <button onClick={triggerError} className="errorBtn">
      Throw Error
    </button>
  );
}
