export interface SearchFormProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (e: React.FormEvent) => void;
    loading: boolean;
}