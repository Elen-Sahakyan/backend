const User = require('../models/user');

class UserRepository {
    async createUser(userData) {
        return User.create(userData);
    }

    async getOrgenizer() {
        return User.findOne({ role: 'organizer' });
    }

    async getUserByEmail(email) {
        return User.findOne({ email });
    }

    async getUserById(userId) {
        return User.findById(userId);
    }

    async addRefreshToken(userId, refreshToken, session) {
        return User.findByIdAndUpdate(
            userId, 
            { $push: { refreshTokens: refreshToken } },
            { session }
        )
    }

    async clearRefreshToken(userId, refreshToken, session) {
        return User.findByIdAndUpdate(
            userId, 
            { $pull: { refreshTokens: refreshToken } },
            { session }
        )
    }

    async getByRefreshToken(id, refreshToken) {
        return User.findOne({
            _id: id, 
            refreshTokens: refreshToken
        });
    }
}

module.exports = new UserRepository();