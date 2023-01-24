import common_en from '../locales/en/app/common.json'
import investFlow_en from '../locales/en/app/investFlow.json';
import marketplace_en from '../locales/en/app/marketplace.json';
import dealDetails_en from '../locales/en/app/dealDetails.json';
import flat from 'flat';

const messages = {
  en: {
    app: {
      common: common_en,
      dealDetails: dealDetails_en,
      investFlow: investFlow_en,
      marketplace: marketplace_en,
    }
  },
  pt: {
    app: {
      common: common_en,
      dealDetails: dealDetails_en,
      investFlow: investFlow_en,
      marketplace: marketplace_en
    }
  }
};

let localizedMsgs;
export function initLocalizedMsgs(locale) {
  localizedMsgs = flat(messages[locale])
  return localizedMsgs;
}

export function getLocalizedMsgs() {
  return localizedMsgs;
}

export function formatMsg(id, params) {
  return localizedMsgs && typeof localizedMsgs[id] === 'function' ? localizedMsgs[id](params) : id;
}



