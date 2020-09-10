const { Schema, model }  = require('mongoose');

const dictionaryWordSchema = new Schema({
  text: String,
  data: [
    {
      pos: String,
      gen: String,
      ts: String,
      tr: [
        {
          text: String,
          pos: String,
          gen: String,
          syn: [
            {
              text: String,
              pos: String,
              gen: String,
            },
          ],
          mean: [
            {
              text: String,
              pos: String,
              gen: String,
            }
          ],
          ex: [
            {
              text: String,
              tr: [
                {
                  text: String
                }
              ]
            }
          ]
        }
      ],
    }
  ]
});

const Dictionary = model('dictionary', dictionaryWordSchema);

module.exports = Dictionary;