const btnClass =
  "min-w-[38px] h-[38px] border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] rounded-lg cursor-pointer text-sm enabled:hover:border-[var(--red)] enabled:hover:text-[var(--red)] disabled:opacity-50 disabled:cursor-not-allowed";
const activeBtnClass =
  "min-w-[38px] h-[38px] border border-[var(--red)] bg-[var(--red)] text-white rounded-lg cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed";

export default function Pagination({ currentPage, totalPages, onPageChange }) {

  if (totalPages <= 1) {
    return null;
  }

  function goTo(pageNum) {
    if (pageNum < 1 || pageNum > totalPages || pageNum === currentPage) return;
    onPageChange(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 my-[30px] flex-wrap">

      <button
        className={btnClass}
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={num === currentPage ? activeBtnClass : btnClass}
          onClick={() => goTo(num)}
        >
          {num}
        </button>
      ))}

      <button
        className={btnClass}
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

    </div>
  );
}
