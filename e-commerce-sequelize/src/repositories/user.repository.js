const { User, Cart }  = require('../../models');

class UserRepository {
    async createUser(userData) {
        const user = await User.create(userData);

        await Cart.create({
            userId: user.id
        });

        return user;
    }

    async findByEmail(userEmail) {
        return User.findOne({
            where: { 
                email: userEmail 
            }
        })
    }

    async findById(userId) {
        return User.findByPk(userId);
    }
}

module.exports = new UserRepository();