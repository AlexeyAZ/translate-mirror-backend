const typeDefs = `
type Word {
  _id: String,
  def: [WordEntry]
}
type YandexWord {
  text: String
}
type WordEntry {
  text: String,
  pos: String,
  gen: String,
  ts: String,
  tr: [Translate],
}
type Translate {
  _id: String,
  text: String,
  pos: String,
  gen: String,
  syn: [Syn],
  mean: [Mean],
  ex: [Example]
}
type Syn {
  text: String,
  pos: String,
  gen: String,
}
type Mean {
  text: String,
  pos: String,
  gen: String,
}
type Example {
  _id: String,
  text: String,
  tr: [ExampleTranslate],
}
type ExampleTranslate {
  text: String,
}
extend type Query {
  getWord(word: String!): Word
  getWordFromYandex(word: String!): [WordEntry]
  getAllEnglishWords: [Word]
  findWord(word: String!): Word
},
extend type Mutation {
  addWords: String
  removeWord(word: String!): Word
}
`;

// input MainPost {
//   title: String,
//   content: String,
//   noteId: String!,
//   localUpdatedAt: String,
//   createdAt: String,
//   updatedAt: String,
//   _id: String,
// },
// extend type Query {
//   getAllPosts: [Post]
// },
// extend type Mutation {
//   createPost(title: String!, content: String!, userId: String!): Post,
//   updatePost(title: String, content: String, postId: String!, localUpdatedAt: String!): Post,
//   updatePosts(userId: String!, posts: [MainPost]!): [Post],
//   deletePost(id: String!): Post,
// }

module.exports = typeDefs;