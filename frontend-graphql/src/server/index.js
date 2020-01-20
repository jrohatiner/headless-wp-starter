import newrelic from 'newrelic';
import express from 'express';
import os from 'os';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import enforce from 'express-sslify';

// we'll talk about this in a minute:
import route from './routes/index';

// initialize the application and create the routes
const app = express();

// other static resources should just be served as they are
app.use(express.static(
  path.resolve(`${__dirname}/../../build/static`),
));

app.use('/static/media', express.static(
  path.resolve(`${__dirname}/../../build/static/media`)
));

app.use('/', route);
app.use('*', (req, res) => {
  res.status(404).send('404');
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.PRODUCTION) {
  console.log('SSL Enforced');
  app.use(enforce.HTTPS({
    trustProtoHeader: true
  }));
}

// start the app
const port = process.env.PORT || 3000;
// eslint-disable-next-line consistent-return
app.listen(port, (error) => {
  if (error) {
    return console.log('something bad happened', error);
  }
  console.log(`app running on ${os.hostname} ${port}`);
});