const getSpeech = require('../helpers/getSpeech');

exports.canHandle = handlerInput => {
    return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    );
};

exports.handle = handlerInput => {
    const { locale } = handlerInput.requestEnvelope.request;
    const speechText = getSpeech(locale, 'EXPLAINATION');

    return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
};
