import BaseController from '@app/common/base/base.controller';
import { EMethod } from '@app/common/common.enum';
import { Request, Response } from 'express';

export default class UserController extends BaseController {
  public path = '/users';

  protected routes: IRoute[] = [
    {
      path: '',
      method: EMethod.GET,
      validationSchema: {
        id: {
          in: ['query'],
          isAscii: {
            errorMessage: ['wrong'],
          },
          exists: {
            errorMessage: ['wrong'],
          },
        },
      },
      handler: this.get,
    },
  ];

  private get(_: Request, res: Response): void {
    res.send('Ok');
  }
}
