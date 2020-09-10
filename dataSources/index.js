const YandexDictionaryAPI = require('./yandexDictionary');

const dataSources = () => ({
  YandexDictionaryAPI: new YandexDictionaryAPI()
})

module.exports = dataSources