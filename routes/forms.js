import express from 'express';
import { getFormSubmissionsController, getFormSubmissionByIdController } from '../controllers/formSubmissionsController.js';
import { getAuthenticatedClient } from '../services/AuthManager.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const ezClient = await getAuthenticatedClient();

        const { timestamp, offset, limit } = req.query;
        const data = await getFormSubmissionsController(ezClient, {
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

router.get('/:formId', async (req, res) => {
    try {
        const ezClient = await getAuthenticatedClient();

        const data = await getFormSubmissionByIdController(ezClient, req.params.formId);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
