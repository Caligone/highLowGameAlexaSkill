const SPEECHES = require('../constants/speeches');

module.exports = function getSpeech(locale, speechCode, parameters = {}) {
    const matchingSpeeches = SPEECHES[locale.toLowerCase()][speechCode];
    const pickedSpeech = matchingSpeeches[Math.floor(Math.random() * matchingSpeeches.length)];
    return Object.keys(parameters).reduce(function (speech, parameterKey, ) {
        return pickedSpeech.replace(`{${parameterKey}}`, parameters[parameterKey])
    }, pickedSpeech);
}