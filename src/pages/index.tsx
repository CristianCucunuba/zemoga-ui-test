import { GetServerSideProps } from "next";
import { Celebrity } from "../types";
import { connectToDatabase } from "../utils/mongoDB";

interface HomeProps {
  celebrities: Celebrity[];
}

export default function Home({ celebrities }: HomeProps) {
  return (
    <div>
      <h1>Rule of thumb</h1>

      {celebrities.map((celeb) => (
        <div key={celeb._id}>{celeb.name}</div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { db } = await connectToDatabase();
  const data = await db.collection("celebrities").find({}).toArray();

  const celebrities = data.map(({ _id, ...celebrity }) => ({
    _id: _id.toString(),
    ...celebrity,
  }));

  return {
    props: {
      celebrities,
    },
  };
};
