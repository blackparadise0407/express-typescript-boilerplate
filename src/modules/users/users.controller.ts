import { AdvancedResponse } from '@app/common/AdvancedResponse';
import BaseController from '@app/common/base/base.controller';
import { EMethod } from '@app/common/common.enum';
import { Request, Response } from 'express';
import { UserRepository } from './users.repository';

export default class UserController extends BaseController {
  public path = '/users';

  protected routes: IRoute[] = [
    {
      path: '',
      method: EMethod.GET,
      handler: this.getAll,
    },
    {
      path: '/:id',
      method: EMethod.GET,
      validationSchema: {
        id: {
          in: ['params'],
          exists: {
            errorMessage: ['is required'],
          },
        },
      },
      handler: this.getById,
    },
  ];

  private async getAll(_: Request, res: Response): Promise<void> {
    const users = await UserRepository.find();
    new AdvancedResponse(res).send(users);
  }

  private async getById(
    { params: { id } }: Request,
    res: Response,
  ): Promise<void> {
    const user = await UserRepository.findOneBy({ email: id });
    new AdvancedResponse(res).send(user);
  }
}
