import { asyncHandler } from '../utils/asyncHandler.js';
import { login } from '../services/auth.service.js';

export const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await login({ email, password });
    res.json(result);
});