import { Logger } from '@app/helpers/logger';
import { NextFunction, Request, Response } from 'express';

export const httpLogger =
  () => (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger('HTTP');
    const { hostname, method, protocol, originalUrl } = req;
    const { statusCode } = res;
    logger.log(
      `[${method}] ${protocol}://${hostname}${originalUrl} ${statusCode}`,
    );
    next();
  };
