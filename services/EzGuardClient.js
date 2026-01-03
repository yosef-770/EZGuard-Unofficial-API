import axios from 'axios';
import { EZGUARD_API_BASE_URL } from '../config.js';

class EzGuardClient {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.csrfToken = null;
        this.sessionId = null;
        this.baseUrl = EZGUARD_API_BASE_URL;
    }

    async getCsrfToken() {
        const response = await axios.get(`${this.baseUrl}/auth/csrf_token/`, {
            withCredentials: true
        });

        const cookies = response.headers['set-cookie'];
        const ezCsrfCookie = cookies.find(c => c.startsWith('ezcsrftoken='));
        this.csrfToken = ezCsrfCookie?.split('=')[1].split(';')[0];
        this.initialCookies = cookies;
    }

    async login() {
        const cookieHeader = this.initialCookies.map(c => c.split(';')[0]).join('; ');

        const response = await axios.post(
            `${this.baseUrl}/auth/login/`,
            {
                email: this.email,
                password: this.password,
                stay_signed_in: true
            },
            {
                headers: {
                    'x-csrftoken': this.csrfToken,
                    'Cookie': cookieHeader,
                    'Content-Type': 'application/json',
                    'Referer': 'https://wow.ez-guard.com/',
                    'x-clientdetails': 'version=4.6.21;lang=he'
                },
                validateStatus: () => true
            }
        );

        if (response.status !== 200) {
            throw new Error(`Login failed: ${response.status}`);
        }

        const newCookies = response.headers['set-cookie'];
        const sessionCookie = newCookies?.find(c => c.startsWith('sessionid='));
        this.sessionId = sessionCookie?.split('=')[1].split(';')[0];
    }

    getCookieHeader() {
        return `ezcsrftoken=${this.csrfToken}; sessionid=${this.sessionId}`;
    }

    async get(path, params = {}) {
        const response = await axios.get(`${this.baseUrl}${path}`, {
            headers: {
                'Cookie': this.getCookieHeader(),
                'Content-Type': 'application/json'
            },
            params: params,
            validateStatus: () => true
        });

        if (response.status !== 200) {
            throw new Error(`GET ${path} failed: ${response.status}`);
        }

        return response.data;
    }

    async init() {
        await this.getCsrfToken();
        await this.login();
    }
}

export default EzGuardClient;
