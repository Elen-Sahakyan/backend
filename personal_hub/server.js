const path = require('path');
const app = require(path.join(process.cwd(), 'src', 'app'));
const { PORT, HOST } = require(path.join(process.cwd(), 'src', 'config', 'env'));

app.listen(PORT, HOST, () => {
    console.log(`server running on port: ${PORT}`);
})