const getSlotValues = require('../helpers/getSlotValuesHelper');

const SPEECH = require('../constants/speech');
const GAME_STATES = require('../constants/gameStates');

exports.canHandle = handlerInput => {
    return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'TryIntent'
    );
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const slotValues = getSlotValues(
        handlerInput.requestEnvelope.request.intent.slots,
    );
    const userInputNumber = Number.parseInt(
        slotValues.USER_INPUT_NUMBER.resolved,
        10,
    );
    userInputNumber;
    let speechText = null;
    if (userInputNumber > sessionAttributes.guessNumber) {
        sessionAttributes.count += 1;
        speechText = SPEECH[locale].TRY_LESS_RESULT;
    } else if (userInputNumber < sessionAttributes.guessNumber) {
        sessionAttributes.count += 1;
        speechText = SPEECH[locale].TRY_MORE_RESULT;
    } else if (userInputNumber === sessionAttributes.guessNumber) {
        sessionAttributes.count += 1;
        speechText = speechText = SPEECH[locale].TRY_WIN_RESULT.replace(
            '{COUNT}',
            sessionAttributes.count,
        );
        sessionAttributes.gameState = GAME_STATES.ENDED;
    } else if (sessionAttributes.gameState !== GAME_STATES.STARTED) {
        speechText = SPEECH[locale].NO_GAME;
    } else {
        speechText = SPEECH[locale].UNKNOWN_NUMBER;
    }
    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
