import { FC } from 'react';
import { PaginationProps } from '../interfaces/PaginationProps.interface';

const PaginationComponent: FC<PaginationProps> = ({
    currentPage,
    onNextPage,
    onPreviousPage,
    isNextDisabled,
    isPreviousDisabled,
}) => (
    <div className="pagination-controls">
        <button onClick={onPreviousPage} disabled={isPreviousDisabled}>
            Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={onNextPage} disabled={isNextDisabled}>
            Next
        </button>
    </div>
);

export default PaginationComponent;
