const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const HallucinationSchema = new Schema(
    {
        date: {
            type: Date,
            required: false,
        },
        model_id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        prompt: {
            type: String,
            required: true,
        },
        bad_response: {
            type: String,
            required: true,
        },
        p_tuned: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: { currentTime: () => Date.now() } },
);

HallucinationSchema.plugin(mongoosePaginate);

const Hallucination = mongoose.model('Hallucination', HallucinationSchema);
module.exports = Hallucination;
