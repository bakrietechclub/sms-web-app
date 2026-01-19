import { useMemo } from 'react';
import { Button } from '../elements/Button';
import ChevronLeft from '../../assets/icons/ChevronLeft.png';
import ChevronRight from '../../assets/icons/ChevronRight.png';
import { range } from '../../utils';

export const Pagination = ({ currentPage = 2, totalPages = 10, onPageChange }) => {
  // Generate pagination range with ellipses logic
  const paginationRange = useMemo(() => {
    const totalPageNumbers = 7; // Maximum page numbers to show

    // Case 1: If total pages is less than max, show all pages
    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const siblingCount = 1; // Pages to show on each side of current page
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: No left dots, but show right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    // Case 3: Show left dots, but no right dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    // Case 4: Show both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  }, [totalPages, currentPage]);

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Don't render if invalid state or only 1 page
  if (currentPage === 0 || totalPages < 2) {
    return null;
  }

  return (
    <div className="mt-2 flex gap-2 items-center justify-center">
      <Button onClick={onPrevious} disabled={currentPage === 1} className="cursor-pointer">
        <img
          src={ChevronLeft}
          className={currentPage === 1 ? 'opacity-50' : ''}
          alt="Previous"
        />
      </Button>

      {paginationRange.map((pageNumber, index) => {
        // Render ellipsis
        if (pageNumber === '...') {
          return (
            <Button
              key={`ellipsis-${index}`}
              className="w-9 h-9 rounded-full bg-white text-black cursor-default"
              disabled
            >
              &#8230;
            </Button>
          );
        }

        // Render page number button
        return (
          <Button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`w-9 h-9 rounded-full cursor-pointer ${pageNumber === currentPage
              ? 'bg-[#E89229] text-white'
              : 'bg-white text-black hover:bg-gray-100'
              }`}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button onClick={onNext} disabled={currentPage === totalPages} className="cursor-pointer">
        <img
          src={ChevronRight}
          className={currentPage === totalPages ? 'opacity-50' : ''}
          alt="Next"
        />
      </Button>
    </div>
  );
};
