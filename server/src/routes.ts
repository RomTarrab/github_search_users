import { Request, Response } from 'express';
import axios from 'axios';

export const getGitHubUsers = async (req: Request, res: Response): Promise<void> => {
    const { q, page = '1', per_page = '10' } = req.query;

    if (typeof q !== 'string') {
        res.status(400).json({ message: 'Query parameter "q" is required and must be a string.' });
        return;
    }

    try {
        const response = await axios.get(`https://api.github.com/search/users`, {
            params: {
                q,
                page,
                per_page,
            },
        });
        const users = response.data.items;

        if (!users || users.length === 0) {
            res.status(404).json({ error: 'No users found for the given query.' });
            return;
        }

        const userDetails = await Promise.all(users.map(async (user: any) => {
            try {
                const userDetail = await axios.get(`https://api.github.com/users/${user.login}`);
                return {
                    username: userDetail.data.name,
                    image: user.avatar_url,
                    publicRepos: userDetail.data.public_repos,
                    company: userDetail.data.company,
                    followers: userDetail.data.followers,
                    following: userDetail.data.following,
                    bio: userDetail.data.bio,
                    location: userDetail.data.location
                };

            } catch (error) {
                console.error(`Error fetching details for user: ${user.userDetail}`, error);
                return {
                    username: user.login,
                    image: user.avatar_url,
                    publicRepos: 0,
                }
            }
        }));

        res.json(userDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users from GitHub' });
    }
};
