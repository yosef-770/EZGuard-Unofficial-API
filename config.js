import 'dotenv/config';

export const TOKEN = process.env.TOKEN;
export const EZGUARD_EMAIL = process.env.EZGUARD_EMAIL;
export const EZGUARD_PASSWORD = process.env.EZGUARD_PASSWORD;
export const EZGUARD_API_BASE_URL = process.env.EZGUARD_API_BASE_URL || 'https://webapi.ez-guard.com/v3';
export const PORT = process.env.PORT || 3050;
