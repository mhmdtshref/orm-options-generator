import express, { Response, Request } from 'express';
import apiRouter from '../router';

export class ExpressApp {
  app = express();

  constructor() {
    this.setAppSettings();
    this.setAppRouter();
  }

  setAppSettings = (): void => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  setAppRouter = (): void => {
    this.app.use(
      apiRouter,
      (error: Error, _request: Request, response: Response) => {
        response.status(400).json({
          success: false,
          error: error.message,
        });
      },
    );
  };
}
