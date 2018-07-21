const SPEECH = require('../constants/speech');

exports.canHandle = handlerInput => {
    return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    );
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;
    const speechText = SPEECH[locale].EXPLAINATION;

    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
