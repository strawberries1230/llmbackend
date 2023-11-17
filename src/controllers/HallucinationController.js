const Utilities = require('../Utilities');
const Hallucination = require('../models/Hallucination');
const mongoose = require('mongoose');

const submitHallucination = async (req, res) => {
    try {
        // const { model_id, prompt, bad_response } = req.body;
        const modelId = req.body.model_id;
        const prompt = req.body.prompt;
        const badResponse = req.body.bad_response;
        // Use the public key to verify the request (optional).
        const mId = mongoose.Types.ObjectId(modelId);
        const newSave = {
            model_id: mId,
            prompt: prompt,
            bad_response: badResponse,
            p_tuned: false,
            date: new Date(),
        };
        // Save the hallucination data to your database (e.g., HALLUCINATION table).
        const hallucination = new Hallucination(newSave);
        // await hallucination.save();
        hallucination
            .save()
            .then((doc) => console.log('Document saved:', doc))
            .catch((err) => console.error('Error saving document:', err));
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
        const hallucination = await Hallucination.find({});
        Utilities.apiResponse(res, 200, 'Hallucination found!', {
            hallucination,
        });
    } catch (error) {
        Utilities.apiResponse(res, 500, error);
    }
};

module.exports = { submitHallucination, getHallucination };
