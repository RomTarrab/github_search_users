export interface PaginationProps {
    currentPage: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
    isNextDisabled: boolean;
    isPreviousDisabled: boolean;
}