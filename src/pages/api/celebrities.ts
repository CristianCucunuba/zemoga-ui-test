import { NextApiRequest, NextApiResponse } from "next";
import { findCelebrities } from "src/api";
import { Celebrity } from "src/types";

type ResponseData = {
  celebrities: Celebrity[];
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const celebrities = await findCelebrities();
  res.status(200).send({ celebrities });
};
