async function getFormSubmissions(ezClient, fromTimestamp, offset = 0, limit = 30) {
    const params = {
        'timestamp__gte': fromTimestamp,
        offset: offset,
        limit: limit,
        ordering: ''
    };

    return await ezClient.get('/data/form_submission', params);
}

export { getFormSubmissions };
