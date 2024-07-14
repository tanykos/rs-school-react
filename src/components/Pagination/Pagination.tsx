import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button className="page-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        &lt;&lt;&lt;
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &gt;&gt;&gt;
      </button>
    </div>
  );
}
