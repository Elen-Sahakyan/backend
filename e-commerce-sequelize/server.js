const app = require('./src/app');
const {
    PORT,
    HOST
} = require('./config/env');

app.listen(PORT, HOST, () => {
    console.log(`Server is running on localhost: ${PORT}`);
})