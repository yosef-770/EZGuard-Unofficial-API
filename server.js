import express from 'express';
import authMiddleware from './middleware/auth.js';
import incidentsRoute from './routes/incidents.js';
import formsRoute from './routes/forms.js';
import { PORT } from './config.js';

const app = express();

app.use(express.json());

app.use(authMiddleware);

app.use('/incidents', incidentsRoute);
app.use('/forms', formsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
