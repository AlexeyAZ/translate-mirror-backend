const { ApolloError, AuthenticationError } = require('apollo-server')
const _ = require('lodash');
const axios = require('axios');
const qs = require('qs');
const fs = require('fs');
const { Schema, model }  = require('mongoose');

const Dictionary = require('./dictionary.model.js');
const NotFoundWords = require('../notFoundWords/notFoundWords.model.js');

const words = require('../../data/parseData');
const config = require('../../config');
const { verify } = require('../../jwt');

const { get, xor, xorBy } = _
const { yandexDictionaryKeys } = config


// const notFoundWordsSchemaNew = new Schema({
//   text: {
//     type: String,
//     lowercase: true
//   }
// });

// const NotFoundWordsNew = model('notFound', notFoundWordsSchemaNew);

// NotFoundWords.find({})
//   .exec()
//   .then(res => {
//     const arr = res.map(item => ({text: item.text}))
//     NotFoundWordsNew.insertMany(arr)
//   })


// Dictionary.find({})
//   .exec()
//   .then(res => {
//     const arr = res
//       .map((item, index) => {
//         const text = item.data[0].text
//         const id = item.data[0]._id
//         return { text, id }
//       })
//       .sort()
//     const filteredArr = arr.filter((element, index) => (element === arr[index - 1]));
//     console.log(filteredArr)
//   })

// const newDictionarySchema = new Schema({
//   text: {
//     type: String,
//     lowercase: true
//   }
// });

// const NewDictionary = model('newDictionary', newDictionarySchema);

// Dictionary.find({})
//   .exec()
//   .then(res => {
//     console.log(res.slice(0, 10))
//     // const arr = res.map(item => ({text: item.text}))
//     // NewDictionary.insertMany(arr)
//   })

// Dictionary.findOne({ "def.text": 'adjective' })
//   .exec()
//   .then(res => {
//     console.log(res)
//     // return Dictionary.findByIdAndDelete(res._id)
//     //   .then(res => console.log(res))
//   })
//   .catch(err => console.log('getWord error'))

// const getWordFromYandex = word => {
//   return Dictionary.findOne({ text: word })
//     .exec()
//     .then(res => {
//       if (!res) {
//         const newWord = new Dictionary(word)
//         return newWord.save()
//           .then(savedWord => savedWord)
//       }
//     })
// }

const resolvers = {
  Query: {
    getAllEnglishWords: (parent, args, context) => {
      verify(context.token, success => {console.log(success)})
      return verify(context.token, () => {
        Dictionary.find({})
          .then(res => {
            const arr = res
              .map(item => item.def[0].text)
              .sort()
            const filteredArr = arr.filter((element, index) => (element === arr[index - 1]));
          })
      })
    },
    getWord: (parent, { word }, {dataSources: { YandexDictionaryAPI }}) => {
      return Dictionary.findOne({ "def.text": word })
        .exec()
        .then(res => res || YandexDictionaryAPI.getWordTranslate(word))
        .then(res => {
          if (get(res, 'def', []).length) {
            return res
          }
          throw new ApolloError('Word not found', 'WORD_NOT_FOUND', {text: word});
        })
        .then(translate =>
          Dictionary.findOne({ "def.text": translate.def[0].text })
            .exec()
            .then(res => {
              if (!res) {
                return new Dictionary(translate).save()
              }
              return translate
            })
        )
        .then(translate => translate)
        .catch(err => err)
    },
    getWordFromDb: (parent, { word }) => {
      return Dictionary.findOne({ "def.text": word })
        .exec()
        .then(res => {
          if (get(res, 'def', []).length) {
            return res
          }
          throw new ApolloError('Word not found', 'WORD_NOT_FOUND', {text: word});
        })
        .catch(err => err)
    },
    getWordFromYandex: (parent, { word }, {dataSources: { YandexDictionaryAPI }}) =>
      YandexDictionaryAPI.getWordTranslate(word)
        .then(res => {
          if (get(res, 'def', []).length) {
            return res.def
          }
          throw new ApolloError('Word not found', 'WORD_NOT_FOUND', {text: word});
        })
        .catch(err => err)
    ,
    findWord: (parent, { word }) =>
      Dictionary.findOne({ "def.text": word })
        .exec()
        .then(res => res)
        .catch(err => err)
    ,
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
    // addWords: () => {
    //   return Dictionary.find({})
    //     .exec()
    //     .then(allWords => {
    //       NotFoundWords.find({})
    //         .exec()
    //         .then(notFoundWords => {
    //           const notFoundWordsXorArr = notFoundWords.map(item => item.text)
    //           const wordsArr = allWords.map(word => word.def[0].text)
    //           const filteredArr = xor(wordsArr, notFoundWordsXorArr, words.map(item => item.toLowerCase()))
    //           const wordsPromise = filteredArr.map(word => {
    //             return axios.post('https://dictionary.yandex.net/api/v1/dicservice.json/lookup', qs.stringify({
    //               key: yandexDictionaryKeys.main,
    //               lang: 'en-ru',
    //               text: word
    //             }))
    //           })

    //           Promise.all(wordsPromise.map(p => p.catch(e => {
    //             return(e)
    //           })))
    //             .then(results => {
    //               const wordsArr = [];
    //               const notFoundWordsArr = [];
    //               results.forEach(item => {
    //                 const def = get(item, 'data.def', [])
    //                 if (def.length > 0) {
    //                   const newEntry = {};
    //                   newEntry.def = def
    //                   wordsArr.push(newEntry)
    //                 } else {
    //                   notFoundWordsArr.push({text: item.config.data.split('&').reverse()[0].replace('text=', '')})
    //                 }
    //               })
    //               Dictionary.insertMany(wordsArr)
    //                 .then(res => {
    //                   const newNotFoundWords = xorBy(notFoundWords, notFoundWordsArr, 'text');
    //                   NotFoundWords.insertMany(newNotFoundWords)
    //                     .then(console.log('insertMany in NotFoundWords', notFoundWordsArr.length))
    //                     .catch(err => console.log(err))
    //                   console.log('insertMany in Dictionary', wordsArr.length)
    //                 })
    //                 .catch(err => console.log('insertMany in Dictionary Error', err))
    //             })
    //             .catch(e => console.log(e));
    //         })
    //     })
    // },
    removeWord: (parent, { word }) => {
      return Dictionary.findOne({ "def.text": word })
        .exec()
        .then(res => Dictionary.findByIdAndDelete(res._id))
        .then(res => res)
        .catch(err => err)
    },
  }
};

module.exports = resolvers;