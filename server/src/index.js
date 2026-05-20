import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(env.nodeEnv === 'development' ? 'dev' : 'combined'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api', routes);

// Error handler last
app.use(errorHandler);

async function start() {
    await connectDB();
    app.listen(env.port, () => {
        console.log(`Server listening on port ${env.port}`);
    });
}

start();