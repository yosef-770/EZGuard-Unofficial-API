async function getIncidents(ezClient, fromTimestamp, offset = 0, limit = 30) {
    const params = {
        'timestamp__gte': fromTimestamp,
        offset: offset,
        limit: limit,
        ordering: ''
    };

    return await ezClient.get('/data/incident', params);
}

export { getIncidents };
