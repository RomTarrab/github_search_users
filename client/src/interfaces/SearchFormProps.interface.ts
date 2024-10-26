export interface SearchFormProps {
    query: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}