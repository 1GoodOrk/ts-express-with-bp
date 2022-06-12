import express from 'express'
// import dotenv from 'dotenv'
// dotenv.config()
import log4js from 'log4js';

// const app = express();
const port = process.env.PORT;


const logger = log4js.getLogger();
logger.level = String(process.env.LOG_LEVEL);

// logger.info('log4js log info');
// logger.debug('log4js log debug');
// logger.error('log4js log error');

// app.get('/', (request, response) => {
//  response.send('Hello world!');
// });
import { useExpressServer } from 'routing-controllers';
import httpContext from 'express-http-context';
import { UserController } from './controllers/user.controller';
import { GlobalErrorHandler } from './middleware/global-error-handler'
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../docs/swagger/opeapi.json';
import cors from 'cors';

const app: express.Express = express();
app.use(express.json());
app.use(httpContext.middleware);
app.use(cors() as express.RequestHandler);
useExpressServer(app, {
  controllers: [UserController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
}); 

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
});
// const app = createExpressServer({
//   controllers: [UserController], // we specify controllers we want to use
// })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => console.log(`Running on port ${port}`));
