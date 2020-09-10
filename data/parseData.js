const removeDoublicates = require('../helpers/removeDoublicates');
const makeArrayFromList = require('../helpers/makeArrayFromList');
const makeLowercase = require('../helpers/makeLowercase');

const wordsList_0 = require('./rawList_0.js');
const wordsList_1 = require('./rawList_1.js');

const resultWordsList = ''.concat(wordsList_0, wordsList_1);

const wordsArray = makeArrayFromList(resultWordsList);
const wordsArrayWithoutDoublicates = removeDoublicates(wordsArray);
const wordsArrayToLowercase = makeLowercase(wordsArrayWithoutDoublicates);

module.exports = wordsArrayToLowercase