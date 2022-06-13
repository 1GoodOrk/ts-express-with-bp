import log4js from 'log4js';

export class LoggingSystem {
  private static logger = log4js.getLogger();

  static warning (message: string): void {
    this.logger.warn(message);
  }

  static error (message: string): void {
    this.logger.error(message);
  }

  static info (message: string): void {
    this.logger.info(message);
  }

  static debug (message: string): void {
    this.logger.debug(message);
  }
}
