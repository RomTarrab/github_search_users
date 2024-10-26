import { GitHubUser } from "./GitHubUser.interface";

export interface UserListProps {
    users: GitHubUser[];
    loading: boolean;
    error: string | null;
    query: string;
}