import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv';
const process = dotenv.config().parsed
//console.log(process)
const getLink = function (obj: any) {
  const db = obj.db;
  return db
}

const mongoAtlasUri = getLink(process)

export function connect(): string {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"),
    )
  } catch (e) {
    console.log("could not connect", e);
  }

  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
  dbConnection.once("open", () => '');
  return 'Success'
}