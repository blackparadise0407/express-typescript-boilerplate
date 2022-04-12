import {
  RequestHandler,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import { checkSchema, Result, validationResult } from 'express-validator';

import { catchAsync } from '@app/helpers/catchAsync';
import { EError, EMethod } from '../common.enum';
import AdvancedError from '../AdvancedError';

export default abstract class BaseController {
  public router: Router = Router();
  public abstract path: string;
  protected abstract readonly routes: Array<IRoute>;

  public getRoutes(): Router {
    this.routes.forEach(
      ({ path, method, validationSchema, middlewares = [], handler }) => {
        middlewares.forEach((middleware) => {
          this.router.use(path, middleware);
        });

        const args: Array<RequestHandler> = [];
        if (validationSchema) {
          args.push(...checkSchema(validationSchema), this.validateRequest);
        }
        args.push(catchAsync(handler));

        switch (method) {
          case EMethod.GET:
            this.router.get(path, ...args);
            break;
          case EMethod.POST:
            this.router.post(path, ...args);
            break;
          case EMethod.PATCH:
            this.router.put(path, ...args);
            break;
          case EMethod.DELETE:
            this.router.delete(path, ...args);
            break;
          default:
            throw new Error('Unsupported method');
        }
      },
    );
    return this.router;
  }

  private validateRequest(req: Request, _: Response, next: NextFunction): void {
    const result: Result = validationResult(req);

    if (!result.isEmpty()) {
      const [{ msg, param, location }] = result.array({
        onlyFirstError: true,
      });

      throw new AdvancedError({
        message: `${location}[${param}] ${msg}`,
        type: EError.BAD_REQUEST,
      });
    } else next();
  }
}
