const Utilities = require('../Utilities');
const Hallucination = require('../models/Hallucination');
const mongoose = require('mongoose');

const submitHallucination = async (req, res) => {
    try {
        console.log('post');
        const { model_id, prompt, bad_response } = req.body;
        // Use the public key to verify the request (optional).
        const mId = mongoose.Types.ObjectId(model_id);

        const newSave = {
            model_id: mId,
            prompt: prompt,
            bad_response: bad_response,
            p_tuned: false,
        };

        // Save the hallucination data to your database (e.g., HALLUCINATION table).
        const hallucination = new Hallucination(newSave);
        const saved = await hallucination.save();
        // Return a success message.
        Utilities.apiResponse(
            res,
            200,
            'Hallucination submitted successfully!',
            {},
        );
    } catch (error) {
        Utilities.apiResponse(res, 500, error);
    }
};

const getHallucination = async (req, res) => {
    try {
        console.log('get');
        const hallucination = await Hallucination.find({});
        Utilities.apiResponse(res, 200, 'Hallucination found!', {
            hallucination,
        });
    } catch (error) {
        Utilities.apiResponse(res, 500, error);
    }
};

module.exports = { submitHallucination, getHallucination };
