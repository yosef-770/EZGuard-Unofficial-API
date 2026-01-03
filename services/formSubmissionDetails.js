async function getFormSubmissionById(ezClient, formSubmissionId) {
    return await ezClient.get(`/data/form_submission/${formSubmissionId}`);
}

export { getFormSubmissionById };
