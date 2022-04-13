import { Logger } from '@app/helpers/logger';
import { NextFunction, Request, Response } from 'express';

export const httpLogger =
  () => (req: Request, _: Response, next: NextFunction) => {
    const logger = new Logger('');
    const { hostname, method } = req;
    next();
  };
