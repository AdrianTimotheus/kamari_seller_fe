import '../assets/style/pagination.css';

type props = {
  currentPage: number,
  totalPage: number,
  changePage: Function,
};
export default function Pagination({ currentPage, totalPage, changePage }:props) {
  const pageShow = 4;
  const pages = [];

  if (totalPage > pageShow + 1) {
    if (currentPage + (pageShow - 1) > totalPage) {
      for (let i = totalPage - (pageShow - 1); i <= totalPage; i += 1) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage; i <= currentPage + (pageShow - 1); i += 1) {
        pages.push(i);
      }
    }
  } else {
    for (let i = 1; i <= totalPage; i += 1) {
      pages.push(i);
    }
  }
  return (
    <div className="pagination">

      {currentPage !== 1 && (
        <button
          type="button"
          onClick={() => changePage(currentPage - 1)}
        >
          &#60;
        </button>
      )}

      {currentPage > 1 && totalPage > (pageShow + 1) && (
        <button
          type="button"
          onClick={() => changePage(1)}
        >
          1
        </button>
      )}

      {currentPage > 2 && totalPage > (pageShow + 1) && (
        <span>...</span>
      )}

      {pages.map((item) => (
        <button
          key={item}
          type="button"
          className={`${item === currentPage ? 'active' : ''}`}
          onClick={() => changePage(item)}
        >
          {item}
        </button>
      ))}

      {currentPage < (totalPage - 5) && (
        <span>...</span>
      )}

      {currentPage < (totalPage - 4) && (
        <button
          type="button"
          onClick={() => changePage(totalPage)}
        >
          {totalPage}
        </button>
      )}

      {currentPage !== totalPage && (
        <button
          type="button"
          onClick={() => changePage(currentPage + 1)}
        >
          &#62;
        </button>
      )}

    </div>
  );
}
