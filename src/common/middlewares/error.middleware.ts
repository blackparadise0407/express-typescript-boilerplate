import { NextFunction, Request, Response } from 'express';

import AdvancedError from '../AdvancedError';
import { EError } from '../common.enum';

export const notFound = (req: Request, res: Response): void => {
  const { originalUrl, hostname, protocol } = req;
  const contructedUrl = `${protocol}://${hostname}${originalUrl}`;
  const error = new AdvancedError({
    message: `${contructedUrl} not found`,
    type: EError.NOT_FOUND,
  });
  error.setStatusCode(404);
  res.send(error).status(error.statusCode);
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  if (err instanceof AdvancedError) {
    res.send(err).status(err.statusCode);
    return;
  }

  const error = new AdvancedError({
    message: 'Internal server error',
    type: EError.INTERNAL_ERROR,
  });
  error.setStatusCode(500);
  res.send(error).status(error.statusCode);
};
