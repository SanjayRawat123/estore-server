const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const app = require('./app');

const port = process.env.PORT ;
const server = app.listen(port, () => {
    console.log(`app runnig on port ${port}`);
});
