import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
import 'moment/locale/nb';
import antd_nb_NO from 'antd/lib/locale-provider/nb_NO';
import { setLocale as setYupLocale } from 'yup';
import nbNO from 'i18n/no-NO';
import en from 'i18n/en';

let currentLanguageCode = null;

const languages = {
  en: {
    id: 'en',
    label: 'English',
    flag: '/images/flags/24/United-States.png',
    dictionary: en,
    antd: undefined,
  },
  'nb-NO': {
    id: 'nb-NO',
    label: 'Norsk',
    flag: '/images/flags/24/norge.png',
    dictionary: nbNO,
    antd: antd_nb_NO,
  },
};

function init() {
  currentLanguageCode =
    localStorage.getItem('language') || 'en';
  setLanguageCode(currentLanguageCode);
}

function getLanguage() {
  return languages[getLanguageCode()];
}

function format(message, args) {
  if (!message) {
    return null;
  }

  try {
    return message.replace(/{(\d+)}/g, function(
      match,
      number,
    ) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
  } catch (error) {
    console.error(message, error);
    throw error;
  }
}

export function getLanguages() {
  return Object.keys(languages).map((language) => {
    return languages[language];
  });
}

export function getAntdLanguage() {
  return getLanguage().antd;
}

export function getLanguageCode() {
  if (!currentLanguageCode) {
    init();
  }

  return currentLanguageCode;
}

export function setLanguageCode(arg) {
  if (!languages[arg]) {
    throw new Error(`Invalid language ${arg}.`);
  }

  moment.locale(arg);
  localStorage.setItem('language', arg);

  if (getLanguage().dictionary.validation) {
    setYupLocale(getLanguage().dictionary.validation);
  }
}

export function i18nExists(key) {
  const message = _get(getLanguage().dictionary, key);
  console.log(message);
  return !!message;
}

export function i18n(key, ...args) {
  const message = _get(getLanguage().dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
}

export function i18nHtml(key, ...args) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: i18n(key, ...args),
      }}
    />
  );
}
