import config from '../config';
import mongoose, { Connection } from 'mongoose';

mongoose.Promise = global.Promise;

export class MongoDB {
  private instance: number;
  private uri: string;
  private connection: Connection;

  constructor() {
    this.uri =  `mongodb://localhost:27017/${config.MONGO_LOCAL_DBNAME}`
    this.connection = mongoose.createConnection(this.uri);
    this.instance = 0;
  }

  getConnection() {
    if (!this.connection) this.connection = mongoose.createConnection(this.uri);
    return this.connection;
  }
}
