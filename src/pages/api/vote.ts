import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectID } from "mongodb";
import { connectToDatabase } from "src/utils/mongoDB";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  const { db } = await connectToDatabase();
  const { body } = req;
  const { celebrityId, vote } = body;

  if (!celebrityId || !vote) {
    res.status(400).send({ message: "Invalid parameters" });
    return;
  }

  if (vote !== "positive" && vote !== "negative") {
    res.status(400).send({ message: "The type of vote is incorrect" });
    return;
  }

  console.log({ celebrityId, vote });

  const { result, modifiedCount } = await db
    .collection("celebrities")
    .updateOne(
      { _id: new ObjectID(celebrityId) },
      {
        $inc: {
          [`votes.${vote}`]: 1,
        },
      }
    );

  if (modifiedCount !== 1 || result.ok !== 1) {
    // Probably a database error occurred
    res
      .status(500)
      .send({ message: "Error: the vote count could not be updated" });
    return;
  }

  res.status(200).send({ message: "Vote count updated succesfully" });
};
