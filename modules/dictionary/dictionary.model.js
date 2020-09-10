const { Schema, model }  = require('mongoose');

const testDictionarySchema = new Schema({
  // data: [],
  def: [
    {
      text: {
        type: String,
        lowercase: true
      },
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

const Dictionary = model('test_dictionary', testDictionarySchema);

module.exports = Dictionary;