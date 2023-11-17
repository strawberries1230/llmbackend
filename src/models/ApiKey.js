const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const ApiKeySchema = new Schema(
    {
        private_key: {
            type: String,
            required: true,
        },
        public_key: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: { currentTime: () => Date.now() } },
);

ApiKeySchema.plugin(mongoosePaginate);

const ApiKey = mongoose.model('ApiKey', ApiKeySchema);
module.exports = ApiKey;
