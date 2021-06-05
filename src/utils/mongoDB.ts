import { Db, MongoClient, MongoClientOptions } from "mongodb";

type MongoDB = { client: MongoClient; db: Db };

interface Mongo {
  conn: null | MongoDB;
  promise: null | Promise<MongoDB>;
}

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB;

let opts: MongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!MONGODB_URI) {
  throw new Error(
    "Please add the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please add the MONGODB_DB environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: Mongo = global.mongo;

if (!cached) {
  global.mongo = { conn: null, promise: null };
  cached = global.mongo;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      console.log(client);
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
