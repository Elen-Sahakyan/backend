const path = require('node:path');

const {
    registerUser,
    loginUser,
    getCurrentUser
} = require(path.join(process.cwd(), 'src', 'services', 'auth.service'));

exports.register = async (req, res) => {
    const { username, password } = req.body;

    await registerUser(username, password);

    return res.status(200).json({
        message: 'registered successfully'
    });
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const token = await loginUser(username, password);

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 360000000
    });

    return res.status(200).json({
        message: 'login successfull'
    });
}

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 7200000
    });

    return res.status(200).json({
        message: 'logout successfull'
    });
}

exports.me = async (req, res) => {
    const userId = req.user.userId;

    const user = await getCurrentUser(userId);

    return res.status(200).json(user);
}