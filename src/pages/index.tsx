import axios from "axios";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import ThumbDown from "@components/ThumbDown";
import ThumbUp from "@components/ThumbUp";
import CelebrityCard from "@components/CelebrityCard";
import Navbar from "@components/Navbar";
import { Celebrity } from "../types";
import { findCelebrities } from "src/api";

interface HomeProps {
  celebrities: Celebrity[];
}

export default function Home({ celebrities }: HomeProps) {
  const { data } = useQuery<Celebrity[]>(
    "celebrities",
    async () => {
      const response = await axios.get("/api/celebrities");
      return response.data.celebrities;
    },
    { initialData: celebrities }
  );

  return (
    <div>
      {/* Hero */}
      <div
        className="relative bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 20%),url('img/pope-francis.png')",
        }}>
        <div className="px-4 pt-7">
          <Navbar />
          <div className="w-[214px] mt-1 text-white bg-black bg-opacity-40 backdrop-filter backdrop-blur-md">
            <div className="p-3">
              <span className="text-sm font-light">What's your opinion on</span>
              <h2 className="mb-1 text-4xl leading-9">Pope Francis?</h2>
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
          <div className="flex items-center pl-12 pr-2 text-xs font-light text-white uppercase bg-black bg-opacity-40">
            closing in
          </div>
          <div className="triangle"></div>
          <div className="flex-grow py-1 -ml-2 text-lg font-light text-gray-700 bg-white bg-opacity-40">
            <span className="ml-4 font-medium text-gray-900">22</span>days
          </div>
        </div>
      </div>
      <div className="px-4">
        {/* Banner */}
        <div className="grid grid-cols-[45%,55%] items-center p-3 mt-6 bg-[#ebebeb] text-light-gray">
          <div>
            <p className="text-sm font-light">Speak out. Be heard.</p>
            <p className="text-2xl font-bold">Be counted</p>
          </div>
          <div className="text-sm font-light leading-4">
            Rule of Thumb is a crowd sourced court of public opinion where
            anyone and everyone can speak out and speak freely. It's easy: You
            share your opinion, we analyze and put the data in a public report.
          </div>
        </div>
        {/* Polls section */}
        <h3 className="mt-6 mb-4 text-2xl font-light">Previous Rulings</h3>
        <div className="flex overflow-x-scroll">
          {data?.map((celebrity) => (
            <CelebrityCard celebrity={celebrity} key={celebrity._id} />
          ))}
        </div>
        {/* CTA */}
        <div
          className="relative mt-6 text-center bg-cover"
          style={{
            backgroundImage: "url('img/bg-people.png')",
          }}>
          <div className="px-8 py-4 bg-white bg-opacity-75">
            <p className="text-2xl text-light-gray">
              Is there anyone else you would want us to add
            </p>
            <button className="w-full py-2 text-lg border-2 border-gray-700 text-light-gray">
              Submit a name
            </button>
          </div>
        </div>
        <div className="mt-6 mb-4 border-b-2 border-gray-700 border-dashed"></div>
        <footer className="flex items-center justify-between mb-8 text-light-gray">
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const celebrities = await findCelebrities();
  return {
    props: {
      celebrities,
    },
  };
};
