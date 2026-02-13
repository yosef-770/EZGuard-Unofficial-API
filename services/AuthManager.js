import EzGuardClient from './EzGuardClient.js';
import { EZGUARD_EMAIL, EZGUARD_PASSWORD } from '../config.js';

let clientInstance = null;
let isInitialized = false;

function createClientWrapper(client) {
    return {
        async get(path, params = {}) {
            try {
                return await client.get(path, params);
            } catch (err) {
                if (err.status !== 403) throw err;
                await refreshAuthentication();
                return await client.get(path, params);
            }
        }
    };
}

async function getAuthenticatedClient() {
    if (!clientInstance) {
        clientInstance = new EzGuardClient(EZGUARD_EMAIL, EZGUARD_PASSWORD);
    }

    if (!isInitialized) {
        try {
            await clientInstance.init();
            isInitialized = true;
            console.log('Connected to EzGuard successfully');
        } catch (error) {
            console.error('Failed to connect to EzGuard:', error.message);
            clientInstance = null;
            isInitialized = false;
            throw error;
        }
    }

    return createClientWrapper(clientInstance);
}

async function refreshAuthentication() {
    try {
        if (clientInstance) {
            console.log('Refreshing EzGuard authentication...');
            await clientInstance.init();
            isInitialized = true;
            console.log('Authentication refreshed successfully');
        }
    } catch (error) {
        console.error('Failed to refresh authentication:', error.message);
        clientInstance = null;
        isInitialized = false;
        throw error;
    }
}

function resetConnection() {
    clientInstance = null;
    isInitialized = false;
    console.log('Connection reset');
}

export { 
    getAuthenticatedClient,
    refreshAuthentication,
    resetConnection
};
