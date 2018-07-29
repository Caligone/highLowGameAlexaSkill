const SPEECH = require('../constants/speech');
const GAME_STATES = require('../constants/gameState');

exports.canHandle = () => {
    return true;
};

exports.handle = (handlerInput, error) => {
    const { locale } = handlerInput.requestEnvelope.request;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    console.error(`Error handled: ${error.message}`, JSON.stringify(error));

    let speechText = null;
    if (sessionAttributes.gameState === GAME_STATES.ENDED) {
        speechText = SPEECH[locale].UNKNOWN_ERROR_NO_GAME;
    } else {
        speechText = SPEECH[locale].UNKNOWN_ERROR;
    }
    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
