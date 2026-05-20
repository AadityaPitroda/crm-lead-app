import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export function authRequired(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Authorization header missing'));
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, env.jwtSecret);
        req.user = payload;
        next();
    } catch (err) {
        next(new ApiError(401, 'Invalid token'));
    }
}

export function requireRole(role) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return next(new ApiError(403, 'Forbidden'));
        }
        next();
    };
}