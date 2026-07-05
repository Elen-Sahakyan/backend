const userRepository = require('../repositories/user.repository');
const {
    hashPass,
    comparePass,
    createToken
} = require('../../utils');
const {
    ConflictError,
    NotAuthenticatedError,
    NotFoundError
} = require('../errors')

class UserService {
    async registerUser(userData) {
        const { 
            email,
            password
        } = userData;
        
        const user = await userRepository.findByEmail(email);

        if(user) throw new ConflictError('Email already in use', 'EMAIL_CONFLICT');

        const hashedPassword = await hashPass(password);
        
        userData.password = hashedPassword;

        return userRepository.createUser(userData);
    }

    async loginUser(email, password) {
        const user = await userRepository.findByEmail(email);

        if(!user) throw new NotAuthenticatedError('Email or password incorrect', 'WRONG_EMAIL');

        const match = await comparePass(password, user.password);

        if(!match) throw new NotAuthenticatedError('Email or password incorrect', 'WRONG_PASS');

        const {
            id,
            role
        } = user;

        const token = createToken({ id, role });

        return token;
    }

    async getProfile(userId) {
        const user = await userRepository.findById(userId);

        if(!user) throw new NotFoundError('User not found', 'USER_NOT_FOUND');

        return user;
    }
}

module.exports = new UserService();