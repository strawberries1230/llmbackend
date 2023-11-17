const mongoose = require('mongoose');
const ENV = require('./DB_config');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connect() {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log('db uri: ' + uri);
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('');
            console.log(
                '********** Successfully Connected To The MongoDB **********',
            );
            console.log('');
        })
        .catch((err) => {
            console.log('');
            console.log(
                '********** \x1b[31mMissing DB Connection\x1b[0m ***********',
            );
            console.log('');
        });
}
connect().then(() => console.log('connect db'));
mongoose.Promise = global.Promise;
