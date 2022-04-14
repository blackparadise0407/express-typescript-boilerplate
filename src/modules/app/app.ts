import express, { Application, RequestHandler } from 'express';

import BaseController from '@app/common/base/base.controller';
import {
  errorHandler,
  notFound,
} from '@app/common/middlewares/error.middleware';
import { Logger } from '@app/helpers/logger';

export default class App {
  public static isDev: boolean;
  public static port: number;

  private readonly logger: Logger;
  private server: Application;

  constructor() {
    this.server = express();
    App.port = parseInt(process.env.PORT, 10) || 8081;
    this.logger = new Logger('Server');
    App.isDev = process.env.NODE_ENV?.trim() === 'development';
  }

  public establishDbConnection(): boolean {
    return true;
  }

  public handleError(): void {
    this.server.use(notFound);
    this.server.use(errorHandler);
  }

  public loadControllers(controllers: Array<BaseController>): void {
    const globalPrefix = '/api';
    controllers.forEach((x) => {
      this.server.use(globalPrefix + x.path, x.getRoutes());
    });
  }

  public loadMiddlewares(middlewares: Array<RequestHandler> = []): void {
    middlewares.forEach((x) => this.server.use(x));
  }

  public run(): void {
    this.server.listen(App.port, () => {
      this.logger.log(`Server is running on port ${App.port}`);
    });
  }
}
