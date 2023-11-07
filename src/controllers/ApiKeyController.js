const { generateKeyPair, checkMatch } = require('../util/keyPairTool');
const Utilities = require('../Utilities');
const ApiKey = require('../models/ApiKey');

const createApiKey = async (req, res) => {
    try {
        console.log('create');
        const { publicKey, privateKey } = generateKeyPair();
        const keyPair = {
            private_key: privateKey,
            public_key: publicKey,
            status: true,
        };

        const apiKey = new ApiKey(keyPair);
        const savedApiKey = await apiKey.save();

        Utilities.apiResponse(res, 200, 'Api key created Successfully!', {
            publicKey,
        });
    } catch (error) {
        Utilities.apiResponse(res, 500, error);
    }
};

const authenticateApiKey = async (req, res) => {
    const { public_key } = req.body;
    try {
        const apiKey = await ApiKey.findOne({ public_key });
        const pvtKey = apiKey.private_key;
        if (apiKey) {
            checkMatch(public_key, pvtKey);
            // API key authentication successful, generate JWT token
            // const token = jwt.sign({ publicKey }, 'your-secret-key', { expiresIn: '1h' });
            // res.json({ token });
            Utilities.apiResponse(res, 200, 'Authentication success!', {});
        } else {
            Utilities.apiResponse(res, 401, 'Authentication failed!', {});
        }
    } catch (error) {
        Utilities.apiResponse(res, 500, 'Authentication failed!', {});
    }
};

module.exports = { createApiKey, authenticateApiKey };
