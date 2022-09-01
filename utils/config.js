require('dotenv').config()

let PORT = process.env.PORT || 3003
let MONGODB_URI =
  process.env.NODE_ENV !== 'test'
    ? process.env.MONGODB_URI
    : process.env.TEST_MONGODB_URI

const config = { PORT, MONGODB_URI }

module.exports = config
