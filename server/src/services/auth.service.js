import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export async function login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, 'Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new ApiError(401, 'Invalid credentials');

    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '1h' });

    return { token, user: { id: user._id, name: user.name, role: user.role } };
}