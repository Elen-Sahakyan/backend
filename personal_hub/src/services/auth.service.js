const path = require('node:path');

const {
    generateId,
    createToken,
    hash,
    verify,
    AppError
} = require(path.join(process.cwd(), 'utils'));

const {
    getUserByUsername,
    getUserById,
    createUser
} = require(path.join(process.cwd(), 'src', 'models', 'auth.model'));

exports.registerUser = async (username, password) => {
    const user = await getUserByUsername(username);

    if(user) throw new AppError('username exits', 409);

    const userId = generateId('u_');
    const hashedPassword = await hash(password);

    const userObject = {
        userId: userId,
        username: username,
        hashedPassword: hashedPassword,
        createdAt: new Date().toISOString()
    }

    await createUser(userObject);
}

exports.loginUser = async (username, password) => {
    const user = await getUserByUsername(username);

    if(!user) throw new AppError('username incorrect', 400);

    const hashed = user.hashedPassword;
    const match = await verify(password, hashed)

    if(!match) {
        throw new AppError('password incorrect', 400);
    }

    const userId = user.userId;

    const token = createToken({ userId, username });

    return token;
}

exports.getCurrentUser = async (userId) => {
    const user = await getUserById(userId);

    delete user.hashedPassword;

    return user;
}