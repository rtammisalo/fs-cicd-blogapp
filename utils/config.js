require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
let PORT = process.env.PORT || 3003
let MONGODB_URI =
  process.env.NODE_ENV !== 'test'
    ? process.env.MONGODB_URI
    : process.env.TEST_MONGODB_URI

const config = { PORT, MONGODB_URI, NODE_ENV }

module.exports = config
