import { getFormSubmissions } from '../services/formSubmissions.js';
import { getFormSubmissionById } from '../services/formSubmissionDetails.js';

async function getFormSubmissionsController(ezClient, reqParams) {
    const { fromTimestamp, offset = 0, limit = 30 } = reqParams;
    return await getFormSubmissions(ezClient, fromTimestamp, offset, limit);
}

async function getFormSubmissionByIdController(ezClient, submissionId) {
    return await getFormSubmissionById(ezClient, submissionId);
}

export { 
    getFormSubmissionsController,
    getFormSubmissionByIdController
};
