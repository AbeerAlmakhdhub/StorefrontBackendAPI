import express, { json } from 'express';
import bodyaParser from 'body-parser';
import cors from 'cors';
import users_routes from './handlers/user_routes';
import products_routes from './handlers/product_routes';
import orders_routes from './handlers/order_routes';

const app: express.Application = express();
const port = 3000;

const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyaParser.json());
app.use(express.json());

products_routes(app);
users_routes(app);
orders_routes(app);

app.get('/', cors(corsOptions), function (req, res, next) {
  res.send('Welcome to the storefront!');
});

app.listen(port, function () {
  const url = 'http://localhost:' + port;
  console.log(
    'Please follow the url: ' + url + ' to open project in browser :)'
  );
});

export default app;
