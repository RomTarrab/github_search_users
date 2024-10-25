import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getGitHubUsers } from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: 'localhost:5173',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from Express");
})

app.get('/api/search_github_users', getGitHubUsers);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})