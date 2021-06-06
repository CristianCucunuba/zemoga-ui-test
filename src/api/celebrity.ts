import { connectToDatabase } from "src/db/database";
import { Celebrity } from "src/types";

export async function findCelebrities(): Promise<Celebrity[]> {
  const { db } = await connectToDatabase();
  const data = await db.collection("celebrities").find({}).toArray();

  const celebrities = data.map(({ _id, ...celebrity }) => ({
    _id: _id.toString(),
    ...celebrity,
  }));

  return celebrities;
}
