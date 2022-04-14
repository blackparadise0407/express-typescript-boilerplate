import { RequestHandler } from 'express';
import { Schema } from 'express-validator';

import { EError, EMethod } from '@app/common/common.enum';

declare global {
  interface IRoute {
    path: string;
    method: EMethod;
    validationSchema?: Schema;
    middlewares?: Array<RequestHandler>;
    handler: RequestHandler;
  }

  interface IAdvancedError {
    message: string;
    type: EError;
  }

  interface IAdvancedResponse {
    message?: string;
    statusCode?: number;
  }
}
