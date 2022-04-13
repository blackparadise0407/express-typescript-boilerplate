import BaseController from '@app/common/base/base.controller';
import {
  errorHandler,
  notFound,
} from '@app/common/middlewares/error.middleware';
import { Logger } from '@app/helpers/logger';
import express, { Application, RequestHandler } from 'express';

export default class App {
  public static isDev: boolean;

  private readonly logger: Logger;
  private readonly port: number;
  private server: Application;

  constructor() {
    this.server = express();
    this.port = parseInt(process.env.PORT, 10) || 8081;
    this.logger = new Logger('Server');
  }

  public establishDbConnection(): boolean {
    return true;
  }

  public handleError(): void {
    this.server.use(notFound);
    this.server.use(errorHandler);
  }

  public loadControllers(controllers: Array<BaseController>): void {
    controllers.forEach((x) => {
      this.server.use(x.path, x.getRoutes());
    });
  }

  public loadMiddlewares(middlewares: Array<RequestHandler> = []): void {
    middlewares.forEach((x) => this.server.use(x));
  }

  public run(): void {
    this.server.listen(this.port, () => {
      this.logger.log(`Server is running on port ${this.port}`);
    });
  }
}
