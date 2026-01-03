import { getIncidents } from '../services/incidents.js';
import { getIncidentById } from '../services/incidentDetails.js';

async function getIncidentsController(ezClient, reqParams) {
    const { fromTimestamp, offset = 0, limit = 30 } = reqParams;
    return await getIncidents(ezClient, fromTimestamp, offset, limit);
}

async function getIncidentByIdController(ezClient, incidentId) {
    return await getIncidentById(ezClient, incidentId);
}

export { 
    getIncidentsController,
    getIncidentByIdController 
};
