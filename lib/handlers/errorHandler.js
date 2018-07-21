const SPEECH = require('../constants/speech');

exports.canHandle = () => {
    return true;
};

exports.handle = (handlerInput, error) => {
    const { locale } = handlerInput.requestEnvelope.request;
    console.error(`Error handled: ${error.message}`);
    const speechText = SPEECH[locale].UNKNOWN_ERROR;
    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
