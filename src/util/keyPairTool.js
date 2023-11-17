const crypto = require('crypto');

const pseudoRandomBytes = (seed, length) => {
    const randomBytes = Buffer.alloc(length);
    for (let i = 0; i < length; i++) {
        randomBytes[i] = (seed * i) % 256;
    }
    return randomBytes;
};

// Generate an RSA key pair
const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // Adjust the key size as needed
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });
    // console.log('Public Key:', publicKey);
    // console.log('Private Key:', privateKey);
    return { publicKey, privateKey };
};

const generateKeyPairFromSeed = (seed) => {
    const randomBytes = pseudoRandomBytes(seed, 1024); // 调整长度
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        pseudoRandomBytes: () => randomBytes,
    });

    return { publicKey, privateKey };
};

const genApiKey = () => {
    // create a base-36 string that is always 30 chars long a-z0-9
    // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};

const checkMatch = (publicKey, privateKey) => {
    const sign = crypto.createSign('SHA256');
    // console.log('check match 1');
    // Both strings should be same
    sign.update('randomStr');
    sign.end();

    const signature = sign.sign(privateKey);

    const verify = crypto.createVerify('SHA256');

    // Both strings should be same
    verify.update('randomStr');
    verify.end();
    return verify.verify(publicKey, signature);
};
module.exports = {
    generateKeyPair,
    genApiKey,
    checkMatch,
    generateKeyPairFromSeed,
};
