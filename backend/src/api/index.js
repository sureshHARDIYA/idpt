const express = require('express')
const cors = require('cors')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const config = require('../../config')()
const authMiddleware = require('../auth/authMiddleware')
const { init: databaseInit, middleware: databaseMiddleware } = require(
  '../database/databaseInit'
)
const path = require('path')
const fs = require('fs')
const helmet = require('helmet')

// Enables CORS
app.use(cors({ origin: true }))

// Enables Helmet, a set of tools to
// increase security.
app.use(helmet())

// Initializes the Database
databaseInit().catch(error => console.error(error))

// Sets up the Upload endpoint, which is required to be REST
const upload = require('./file/upload')
upload.mapAllUploadRequests('/api', app, databaseMiddleware, authMiddleware)

// Sets up the Download endpoint, which is required to be REST
const download = require('./file/download')
app.get('/api/download', databaseMiddleware, authMiddleware, download)

// Sets up the GraphQL endpoint
app.use(
  '/api',
  databaseMiddleware,
  authMiddleware,
  graphqlHTTP(req => ({
    schema,
    graphiql: config.graphiql,
    context: {
      currentUser: req.currentUser,
      language: req.headers['accept-language'] || 'en'
    },
    formatErrorFn (error) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error)
      }

      return {
        message: error.message,
        code: error.originalError && error.originalError.code,
        locations: error.locations,
        path: error.path
      }
    }
  }))
)

// Exposes the build of the frontend
// to the root / of the server
const frontendDir = path.join(__dirname, '../../../frontend/build')

if (fs.existsSync(frontendDir)) {
  app.use('/', express.static(frontendDir))

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(frontendDir, 'index.html'))
  })
}

module.exports = app
