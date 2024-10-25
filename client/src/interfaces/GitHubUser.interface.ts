export interface GitHubUser {
    username: string;
    image: string;
    publicRepos: number;
    company: string | null;
    followers: number;
    following: number;
    bio?: string;
    location: string;
}
