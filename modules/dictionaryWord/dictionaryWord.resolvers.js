const _ = require('lodash');
const axios = require('axios');
const qs = require('qs');

const Dictionary = require('./dictionaryWord.model.js');

const words = require('../../data/parseData');

const { get, xor } = _


const resolvers = {
  Query: {
    getAllWords: () => Dictionary.find({}),
    getWord: (parent, { word }) => {
      return Dictionary.findOne({ text: word })
        .exec()
        .then(res => {
          console.log(res)
          return res
        })
    },
    getWordFromYandex: (parent, { word }) => axios.post(
      'https://dictionary.yandex.net/api/v1/dicservice.json/lookup',
        qs.stringify({
        key: 'dict.1.1.20190723T080351Z.e96b0b5ea7b15fd5.3f88f96fff9efb1dad56782975da7285f0715342',
        lang: 'en-ru',
        text: word
      }))
        .then(res => res.data.def)
  },
  Mutation: {
    addWord: (parent, { word }) => {
      return Dictionary.findOne({ text: word })
        .exec()
        .then(res => {
          if (!res) {
            const newWord = new Dictionary(word)
            return newWord.save()
              .then(savedWord => savedWord)
          }
        })
    },
    addWords: () => {
      return Dictionary.find({})
        .exec()
        .then(allWords => {
          const wordsArr = allWords.map(word => word.text)
          const filteredArr = xor(wordsArr, words)
          const wordsPromise = filteredArr.slice(0, 20).map(word => {
            return axios.post('https://dictionary.yandex.net/api/v1/dicservice.json/lookup', qs.stringify({
              key: 'dict.1.1.20190723T080351Z.e96b0b5ea7b15fd5.3f88f96fff9efb1dad56782975da7285f0715342',
              lang: 'en-ru',
              text: word
            }))
          })

          Promise.all(wordsPromise.map(p => p.catch(e => e)))
            .then(results => {
              results.map(item => {
                const def = get(item, 'data.def', [])
                if (def.length > 0) {
                  console.log(def)
                } else {
                  console.log('error')
                }
              })
            })
            .catch(e => console.log(e));
        })
    }
  }
};

module.exports = resolvers;