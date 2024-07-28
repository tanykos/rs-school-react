import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { moviesApi } from '../../services/apiService';
import './Pagination.scss';
import { setPage } from '../../store/slices/pageSlice';
import { useEffect } from 'react';

export default function Pagination() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.page.currentPage);
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';
  const { data } = moviesApi.useFetchMoviesQuery({ term: searchTerm, page: currentPage });

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (data?.totalPages && page >= 1 && page <= data?.totalPages) {
      dispatch(setPage(page));
    }
  };

  return (
    <>
      {!!data?.totalPages && (
        <div className="pagination">
          <button className="page-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            &lt;&lt;&lt;
          </button>
          <span data-testid="page-counter">{`Page ${currentPage} of ${data?.totalPages}`}</span>
          <button
            className="page-btn"
            disabled={currentPage === data?.totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;&gt;&gt;
          </button>
        </div>
      )}
    </>
  );
}
