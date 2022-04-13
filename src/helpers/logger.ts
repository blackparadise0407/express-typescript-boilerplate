import chalk from 'chalk';
import moment from 'moment';

export class Logger {
  private context: string;

  constructor(context = '') {
    this.context = context;
  }

  public error(message = ''): void {
    const timestamp = moment().utc().format('DD/MM/YYYY - HH:mm:ssZ');
    // eslint-disable-next-line no-console
    console.log(chalk.redBright(`${timestamp} [${this.context}] ${message}`));
  }

  public log(message = ''): void {
    const timestamp = moment().utc().format('DD/MM/YYYY - HH:mm:ssZ');
    // eslint-disable-next-line no-console
    console.log(chalk.blueBright(`${timestamp} [${this.context}] ${message}`));
  }

  public warn(message = ''): void {
    const timestamp = moment().utc().format('DD/MM/YYYY - HH:mm:ssZ');
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellowBright(`${timestamp} [${this.context}] ${message}`),
    );
  }
}
