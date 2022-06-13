import express from 'express';
import 'dotenv/config';

import swaggerUi from 'swagger-ui-express';
import { useExpressServer } from 'routing-controllers';
import httpContext from 'express-http-context';
import cors from 'cors';

import { UserController } from './controllers/user.controller';
import { FileController } from './controllers/file.controller';
import { ArticleController } from './controllers/article.controller';

import { GlobalErrorHandler } from './middleware/global-error-handler';

import * as swaggerDocument from '../docs/swagger/opeapi.json';

const app: express.Express = express();

app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));

app.use(httpContext.middleware);
app.use(cors() as express.RequestHandler);

useExpressServer(app, {
	controllers: [UserController, FileController, ArticleController],
	middlewares: [GlobalErrorHandler],
	defaultErrorHandler: false
}); 

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	httpContext.ns.bindEmitter(req);
	httpContext.ns.bindEmitter(res);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));
