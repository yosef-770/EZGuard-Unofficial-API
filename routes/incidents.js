import express from 'express';
import { getIncidentsController, getIncidentByIdController } from '../controllers/incidentsController.js';
import { getAuthenticatedClient } from '../services/AuthManager.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const ezClient = await getAuthenticatedClient();

        const { timestamp, offset, limit } = req.query;
        const data = await getIncidentsController(ezClient, {
            fromTimestamp: timestamp,
            offset: offset ? parseInt(offset) : 0,
            limit: limit ? parseInt(limit) : 30
        });

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:incidentId', async (req, res) => {
    try {
        const ezClient = await getAuthenticatedClient();

        const data = await getIncidentByIdController(ezClient, req.params.incidentId);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
