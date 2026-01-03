async function getIncidentById(ezClient, incidentId) {
    return await ezClient.get(`/data/incident/${incidentId}`);
}

export { getIncidentById };
