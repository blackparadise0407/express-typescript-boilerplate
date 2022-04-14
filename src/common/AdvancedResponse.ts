import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { isEmpty } from 'lodash';

export class AdvancedResponse {
  private readonly res: Response;
  constructor(res: Response) {
    this.res = res;
  }

  public send<T>(data: T, options?: IAdvancedResponse): void {
    const returnedData = isEmpty(data) ? data : instanceToPlain(data);
    if (!options) {
      this.res.send({
        data: returnedData,
        message: 'Ok',
        statusCode: 200,
      } as IAdvancedResponse);
    } else {
      const { statusCode = 200, message = 'Ok' } = options;
      this.res
        .status(statusCode)
        .send({ data: returnedData, message, statusCode });
    }
  }
}
