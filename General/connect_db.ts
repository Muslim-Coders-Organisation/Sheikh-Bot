import { Connection, createConnection } from "typeorm";
import log, { errorLog } from "./logger";

class Database {
  async connect(): Promise<void> {
    createConnection().then(async (connection: Connection) => {
      if (!connection.isConnected) {
        log('error', 'Database', 'Error while database connection');
      }
      log("info", "Database", "Successfully connected to database");
      log("info", "Database", "Registered entities: " + connection.entityMetadatas.length);
    }).catch(error => {
      log('critical', 'Database', 'Failed to connect to database');
      errorLog(error, true);
    })
  }
}

export default Database;