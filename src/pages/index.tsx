import { GetServerSideProps } from "next";
import ThumbDown from "@components/ThumbDown";
import ThumbUp from "@components/ThumbUp";
import CelebrityCard from "@components/CelebrityCard";
import { connectToDatabase } from "../utils/mongoDB";
import { Celebrity } from "../types";

interface HomeProps {
  celebrities: Celebrity[];
}

export default function Home({ celebrities }: HomeProps) {
  return (
    <div className="border border-red-700">
      {/* Hero */}
      <div
        className="relative bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 20%),url('img/pope-francis.png')",
        }}>
        <div className="px-4 pt-7">
          <img src="img/hamburger.svg" className="absolute top-5 right-5 w-7" />
          <h1 className="text-2xl text-white">Rule of thumb.</h1>
          <div className="w-56 mt-1 text-white bg-black bg-opacity-40 backdrop-filter backdrop-blur-md">
            <div className="p-3">
              <span className="text-sm font-light">What's your opinion on</span>
              <h2 className="mb-4 text-4xl leading-9">Pope Francis?</h2>
              <p className="font-light leading-4">
                He's talking tough on clergy sexual abuse, or is he just another
                pervert protector? (thumbs down) or a true pedophile punishing
                pontiff? (thumbs up)
              </p>
              <span className="inline-block mt-4 text-xs font-bold">
                What's Your Veredict?
              </span>
            </div>
            <div className="grid grid-cols-2">
              <ThumbUp />
              <ThumbDown />
            </div>
          </div>
        </div>
        <div className="flex items-stretch mt-6">
          <div className="flex items-center pl-12 text-sm font-light text-white bg-black bg-opacity-40">
            CLOSING IN
          </div>
          <div className="flex-grow py-1 text-lg font-light text-gray-700 bg-white bg-opacity-40">
            <span className="text-gray-900">22</span>days
          </div>
        </div>
      </div>
      {/* Banner */}
      <div className="grid grid-cols-[45%,55%] items-center p-3 mt-6 bg-[#ebebeb]">
        <div>
          <p className="text-sm font-light">Speak out. Be heard.</p>
          <p className="text-2xl font-medium">Be counted</p>
        </div>
        <div className="text-sm font-light leading-4 ">
          Rule of Thumb is a crowd sourced court of public opinion where anyone
          and everyone can speak out and speak freely. It's easy: You share your
          opinion, we analyze and put the data in a public report.
        </div>
      </div>
      {/* Polls section */}
      <div>
        <h3 className="mb-4 text-2xl font-light">Previous Rulings</h3>
        <div className="flex overflow-x-scroll">
          {celebrities.map((celebrity) => (
            <CelebrityCard celebrity={celebrity} />
          ))}
        </div>
        {/* CTA */}
        <div
          className="relative mt-6 text-center"
          style={{
            backgroundImage: "url('img/bg-people.png')",
          }}>
          <div className="px-8 py-4 bg-white bg-opacity-75">
            <p className="text-2xl">
              Is there anyone else you would want us to add
            </p>
            <button className="w-full py-2 text-lg border-2 border-gray-700">
              Submit a name
            </button>
          </div>
        </div>
        <div className="mt-6 mb-4 border-b-2 border-gray-700 border-dashed"></div>
        <footer className="flex items-center justify-between mb-8">
          <ul className="space-y-4 text-sm">
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
          <div className="self-end">
            <span>Follow us</span>
            <div className="flex">
              <img
                src="img/facebook.svg"
                alt="facebook logo"
                className="mr-4"
              />
              <img src="img/twitter.svg" alt="twitter logo" />
            </div>
          </div>
        </footer>
      </div>
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
