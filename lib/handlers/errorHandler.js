const getSpeech = require('../helpers/getSpeech');
const GAME_STATES = require('../constants/gameStates');

exports.canHandle = () => {
    return true;
};

exports.handle = (handlerInput, error) => {
    const { locale } = handlerInput.requestEnvelope.request;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    console.error(`Error handled: ${error.message}`, JSON.stringify(error));

    let speechText = null;
    if (sessionAttributes.gameState === GAME_STATES.ENDED) {
        speechText = getSpeech(locale, 'UNKNOWN_ERROR_NO_GAME');
    } else {
        speechText = getSpeech(locale, 'UNKNOWN_ERROR');
    }
    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
