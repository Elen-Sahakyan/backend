const userService = require('../services/user.service');

class UserController {
    async signUp(req, res, next) {
        const userData = req.body;

        await userService.registerUser(userData)

        return res.status(201).json({
            message: 'Signed-Up successfully'
        });
    }

    async signIn(req, res, next) {
        const { email, password } = req.body;

        const token = await userService.loginUser(email, password);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 36000000
        });

        return res.status(200).json({
            message: 'Signed-in successfully'
        });
    }

    async me(req, res, next) {
        const { id } = req.user;

        const user = await userService.getProfile(id);

        return res.status(200).json(user);
    }
}

module.exports = new UserController();