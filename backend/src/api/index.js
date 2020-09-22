require('dotenv').config();
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const fs = require('fs');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const config = require('../../config')();
const authMiddleware = require('../auth/authMiddleware');
const {
  init: databaseInit,
  middleware: databaseMiddleware,
} = require('../database/databaseInit');

app.options('*', cors());

var allowedOrigins = [
  '127.0.0.1',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://idpt.herokuapp.com',
  'https://idpt.herokuapp.com/',
  'https://idpt.herokuapp.com/*',
  '//*.herokuapp.com:*/*',
];

// Enables CORS
app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORSD policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);

// Enables Helmet, a set of tools to
// increase security.
app.use(helmet());

// Initializes the Database
databaseInit().catch((error) => console.error(error));

// Sets up the Upload endpoint, which is required to be REST
const upload = require('./file/upload');
upload.mapAllUploadRequests(
  '/api',
  app,
  databaseMiddleware,
  authMiddleware,
);

// Sets up the Download endpoint, which is required to be REST
const download = require('./file/download');
app.get(
  '/api/download',
  databaseMiddleware,
  authMiddleware,
  download,
);

// Sets up the GraphQL endpoint
app.use(
  '/api',
  databaseMiddleware,
  authMiddleware,
  graphqlHTTP((req) => ({
    schema,
    graphiql: config.graphiql,
    context: {
      currentUser: req.currentUser,
      language: req.headers['accept-language'] || 'en',
    },
    formatErrorFn(error) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }

      return {
        message: error.message,
        code:
          error.originalError && error.originalError.code,
        locations: error.locations,
        path: error.path,
      };
    },
  })),
);

// Exposes the build of the frontend
// to the root / of the server
const frontendDir = path.join(
  __dirname,
  '../../../frontend/build',
);

if (fs.existsSync(frontendDir)) {
  app.use('/', express.static(frontendDir));

  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(frontendDir, 'index.html'),
    );
  });
}

module.exports = app;
