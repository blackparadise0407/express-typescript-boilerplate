import 'module-alias/register';

import { json, RequestHandler, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { App } from '@app/modules/app';
import BaseController from '@app/common/base/base.controller';
import UserController from '@app/modules/users/users.controller';
import { httpLogger } from './common/middlewares/http-logger.middleware';

config();

const app = new App();

const controllers: Array<BaseController> = [new UserController()];

const globalMiddleware: Array<RequestHandler> = [
  httpLogger(),
  urlencoded({ extended: false }),
  json(),
  cors({ credentials: true, origin: '*' }),
  helmet(),
  morgan('dev'),
];

Promise.resolve()
  .then(() => app.establishDbConnection())
  .then((initSuccess) => {
    if (initSuccess) {
      app.loadMiddlewares(globalMiddleware);
      app.loadControllers(controllers);
      app.handleError();
      app.run();
    }
  });
