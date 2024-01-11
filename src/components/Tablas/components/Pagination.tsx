import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mt-4 flex gap-1 justify-end items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 border-2 border-[#009EFB]/50 rounded-lg text-[#009EFB] cursor-pointer"
      >
        <AiFillCaretLeft />
      </button>
      <span className="text-[#009EFB]">
        {`Página ${currentPage} de ${totalPages}`}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-1 border-2 border-[#009EFB]/50 rounded-lg text-[#009EFB] cursor-pointer"
      >
        <AiFillCaretRight />
      </button>
    </div>
  );
};

export default Pagination;
