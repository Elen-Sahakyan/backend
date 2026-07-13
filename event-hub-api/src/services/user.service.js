const userRepository = require('../repositories/user.repository');
const {
    ConflictError,
    NotFoundError,
    NotAuthenticatedError
} = require('../errors');

const {
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken,
    hashPassword,
    verifyPassword
} = require('../../utils');

class UserService {
    async registerUser(isOrganizer, userData) {
        const user = await userRepository.getUserByEmail(userData.email);

        if(user) {
            throw new ConflictError('Email already exists', 'EMAIL_EXISTS');
        }

        if(isOrganizer) userData.role = 'organizer';

        const hashedPassword = await hashPassword(userData.password);

        userData.password = hashedPassword;

        return userRepository.createUser(userData);
    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email);

        if(!user || !(await verifyPassword(password, user.password))) {
            throw new NotAuthenticatedError('Email or password incorrect', 'WRONG_CRED');
        }

        const accessToken = createAccessToken({
            id: user._id,
            role: user.role,
        });

        const refreshToken = createRefreshToken({
            id: user._id,
            role: user.role,
        });

        await userRepository.addRefreshToken(user._id, refreshToken);

        return {
            accessToken,
            refreshToken
        }
    }

    async findOrganizer() {
        return userRepository.getOrgenizer();
    }

    async getUser(userId) {
        const user = await userRepository.getUserById(userId);

        if(!user) {
            throw new NotFoundError(`User with id ${userId} not found`);
        }

        return user;
    }

    async logoutUser(userId, refreshToken) {
        const user = await userRepository.clearRefreshToken(userId, refreshToken);

        if(!user) {
            throw new NotFoundError('Refresh token is wrong', 'FALSE_REFRESH_T');
        }
    }

    /**
     * Rotates acess token.
     * Validates refresh token, creates new access token.
     */
    async updateAccessToken(refreshToken) {
        let decodedUser = null;

        try {
            decodedUser = verifyRefreshToken(refreshToken);
        } catch (error) {
            throw new NotAuthenticatedError(
                'Invalid refresh token, login required', 
                'INVALID_REFRESH_T'
            );
        }

        const { id } = decodedUser;

        const user = await userRepository.getByRefreshToken(id, refreshToken);

        if(!user) {
            throw new NotAuthenticatedError(
                'Unknown refresh token', 
                'UNKNOWN_REFRESH_T'
            );
        }

        const newAccessToken = createAccessToken({
            id,
            role: user.role,
        });

        return newAccessToken;
    }
}

module.exports = new UserService();


