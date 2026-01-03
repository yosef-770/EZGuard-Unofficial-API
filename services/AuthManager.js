import EzGuardClient from './EzGuardClient.js';
import { EZGUARD_EMAIL, EZGUARD_PASSWORD } from '../config.js';

let clientInstance = null;
let isInitialized = false;

/**
 * Returns authenticated EzGuardClient instance
 * Creates connection only on first call, reuses token on subsequent calls
 */
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
    
    return clientInstance;
}

/**
 * Refreshes authentication when token expires
 */
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

/**
 * Resets connection state
 */
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
