import { FC } from "react";
import { GitHubUser } from "../interfaces/GitHubUser.interface";

import "../styles/userCard.scss"

const GitHubUserCard: FC<{ userInfo: GitHubUser }> = ({ userInfo }) => {

    const truncatedBio = userInfo.bio && userInfo.bio.length > 100
        ? userInfo.bio.slice(0, 30) + '...'
        : userInfo.bio || 'This profile has no bio';

    return (
        <div className="user-card">
            <div className="user-details-left">
                <img
                    className="profile-image"
                    src={userInfo.image}
                    alt={`${userInfo.username} avatar`}
                />
                <h2>{userInfo.username}</h2>
                <a
                    href={`https://github.com/${userInfo.username}`}
                    className="link-to-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Profile
                </a>
            </div>

            <div className="user-details-right">
                <p>{truncatedBio}</p>
                <p>Public Repos: {userInfo.publicRepos}</p>
                <div className="icons_section">
                    <p>{userInfo.company ? userInfo.company : "Company Not Available"}</p>
                    <p>{userInfo.location ? userInfo.location : 'Location Not Available'}</p>
                </div>
            </div>

        </div>
    );
};

export default GitHubUserCard;
