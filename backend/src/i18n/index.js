const en = require('./en');
const ptBR = require('./pt-BR');
const _get = require('lodash/get');

/**
 * Object with the languages available.
 */
const languages = {
  en: en,
  'pt-BR': ptBR,
};

/**
 * Replaces the parameters of a message with the args.
 *
 * @param {*} message
 * @param {*} args
 */
function format(message, args) {
  if (!message) {
    return null;
  }

  return message.replace(/{(\d+)}/g, function(
    match,
    number,
  ) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match;
  });
}

/**
 * Checks if the key exists on the language.
 *
 * @param {*} languageCode
 * @param {*} key
 */
const i18nExists = (languageCode, key) => {
  const message = _get(languages[languageCode], key);
  return !!message;
};

/**
 * Returns the translation based on the key.
 *
 * @param {*} languageCode
 * @param {*} key
 * @param  {...any} args
 */
const i18n = (languageCode, key, ...args) => {
  const message = _get(languages[languageCode], key);

  if (!message) {
    return key;
  }

  return format(message, args);
};

exports.i18n = i18n;
exports.i18nExists = i18nExists;
