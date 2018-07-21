const getSlotValues = require('../helpers/getSlotValuesHelper');

const SPEECH = require('../constants/speech');
const GAME_STATES = require('../constants/gameStates');

exports.canHandle = handlerInput => {
    return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'StopGameIntent'
    );
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.gameState = GAME_STATES.ENDED;
    const speechText = SPEECH[locale].GAME_CANCELED.replace(
        '{GUESS_NUMBER}',
        sessionAttributes.guessNumber,
    );
    return handlerInput.responseBuilder.speak(speechText).getResponse();
};
