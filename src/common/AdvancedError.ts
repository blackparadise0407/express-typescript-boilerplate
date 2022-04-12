export default class AdvancedError extends Error {
  public errors: IAdvancedError;
  public statusCode: number;

  constructor(errors: IAdvancedError) {
    super();
    this.statusCode = 400;
    this.errors = errors;
  }

  public setStatusCode(code: number) {
    this.statusCode = code;
  }
}
