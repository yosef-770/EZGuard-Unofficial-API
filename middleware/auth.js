import { TOKEN } from '../config.js';

function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if (token === `Bearer ${TOKEN}`) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export default authMiddleware;
