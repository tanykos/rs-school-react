import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { unselectMovies } from '../../store/slices/moviesSlice';
import './Flyout.scss';
import { convertToCSV, createCSVDownloadURL } from '../../shared/convertToCSV';

interface FlyoutProps {
  itemCount: number;
}

export default function Flyout({ itemCount }: FlyoutProps) {
  const dispatch = useAppDispatch();
  const selectedMovies = useAppSelector((state) => state.movies.selectedMovies);
  const [csvURL, setCsvURL] = useState<string | null>(null);
  const filename = `${itemCount}_movies.csv`;

  useEffect(() => {
    if (itemCount > 0) {
      const csvContent = convertToCSV(selectedMovies);
      const url = createCSVDownloadURL(csvContent);
      setCsvURL(url);
    } else {
      setCsvURL(null);
    }
  }, [itemCount, selectedMovies]);

  const handleUnselect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(unselectMovies());
  };

  return (
    <div className={`flyout ${itemCount > 0 ? 'visible' : 'hidden'}`}>
      <p className="info">{itemCount} item(s) selected</p>
      <button className="mr-1" onClick={handleUnselect}>
        Unselect all
      </button>
      {csvURL && (
        <a className="secondary-btn" href={csvURL} download={filename} onClick={(e) => e.stopPropagation()}>
          Download
        </a>
      )}
    </div>
  );
}
