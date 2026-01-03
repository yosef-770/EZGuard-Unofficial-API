import { getIncidentById } from '../services/incidentDetails.js';

async function getIncidentByIdController(ezClient, incidentId) {
    return await getIncidentById(ezClient, incidentId);
}

export { getIncidentByIdController };
