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
app.use('/', route);
// other static resources should just be served as they are
app.use(express.static(
  path.resolve(__dirname, '..', '..', '..', 'build'),
  { maxAge: '30d' },
));

app.use('images', express.static(
  path.resolve(`${__dirname}/web/images`)
));

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