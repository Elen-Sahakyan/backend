const user = require('../models/user');
const userService = require('../services/user.service');

class UserController {
    async signUp (req, res) {
        const userData = req.body;

        const isOrganizer = req.user?.role;

        await userService.registerUser(isOrganizer, userData);

        return res.status(201).json({
            message: 'Registered successfuly'
        });
    }

    async signIn(req, res) {
        const {
            email,
            password
        } = req.body;

        const {
            accessToken,
            refreshToken
        } = await userService.loginUser(email, password);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 36000000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 36000000,
            path: 'auth'
        });

        return res.status(200).json({
            message: 'Signed-in successfully'
        });
    }

    async getProfile(req, res) {
        const { id } = req.user;

        const profile = await userService.getUser(id);

        return res.status(200).json(profile);
    }

    async signOut(req, res) {
        const { refreshToken } = req.cookies;

        const { id } = req.user;

        await userService.logoutUser(id, refreshToken);

        return res.status(204).json();
    }

    /**
     * Refreshes access token using refresh token from cookie.
     */

    async refresh(req, res) {
        const { refreshToken } = req.cookies;

        const newAccessToken = await userService.updateAccessToken(refreshToken);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 36000000
        });

        return res.status(200).json({
            message: 'Access-token updated successfully'
        });
    }
}

module.exports = new UserController();