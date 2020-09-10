module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  db: {
    url: process.env.MONGO_URL
  },
  yandexDictionaryKeys: {
    main: process.env.YANDEX_DICT_KEY_MAIN,
    sk: process.env.YANDEX_DICT_KEY_SK,
    wl: process.env.YANDEX_DICT_KEY_WL,
  }
};