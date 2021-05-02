import env from 'dotenv';
env.config();
import Http from 'http';
import { Sequelize } from 'sequelize';
import { ExpressApp } from './app';
import { sequelize } from '../models';

export class Server {
  expressApp = new ExpressApp();

  httpServer: Http.Server;

  constructor() {
    this.httpServer = new Http.Server(this.expressApp.app);
  }

  runServer = (): Promise<void | Http.Server> => {
    return this.databaseConnection()
      .then(() => {
        this.serverListen();
      })
      .catch((error) => {
        this.serverErrorHandler(error);
      });
  };

  databaseConnection = (): Promise<Sequelize> => {
    return this.sequelizeSync();
  };

  sequelizeAuthenticate = (): Promise<void> => {
    return sequelize.authenticate();
  };

  sequelizeSync = (): Promise<Sequelize> => {
    return sequelize.sync();
  };

  serverListen = (): Http.Server => {
    return this.httpServer.listen(process.env.PORT, (): void => {
      console.log(`Server is running on: http://${process.env.HOST}:${process.env.PORT}`);
    });
  };

  serverErrorHandler = (error: Error): void => {
    console.log(`Server run error${error.message}`);
  };
}

const server = new Server();
server.runServer().catch((err) => {
    console.log('Unable to run the server, error: ', err);
});
