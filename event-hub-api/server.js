const app = require('./src/app');
const {
    PORT,
    HOST,
} = require('./config/env');
const connectDB = require('./config/db');
const createDefaultOrganizer = require('./utils/createDefaultOrganizer');

(async() => {
    try {
        await connectDB();
        await createDefaultOrganizer();
        app.listen(PORT, HOST, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();

