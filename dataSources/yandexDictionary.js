const { RESTDataSource } = require('apollo-datasource-rest');

const config = require('../config');
const { yandexDictionaryKeys } = config

class YandexDictionaryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dictionary.yandex.net/api/v1/dicservice.json/';
  }

  willSendRequest(request) {
    request.params.set('key', yandexDictionaryKeys.main);
    request.params.set('lang', 'en-ru');
  }

  async getWordTranslate(word) {
    return this.get(
      'lookup',
      {
        text: word,
      }
    );
  }
}

module.exports = YandexDictionaryAPI