import axios from "axios";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import ThumbDown from "@components/ThumbDown";
import ThumbUp from "@components/ThumbUp";
import Navbar from "@components/Navbar";
import { Celebrity } from "../types";
import { findCelebrities } from "src/api";
import { useMediaQuery } from "@hooks/useMediaQuery";
import GridCelebrities from "@components/GridCelebrities";

interface HomeProps {
  celebrities: Celebrity[];
}

export default function Home({ celebrities }: HomeProps) {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
      <div className="relative">
        <Image
          src="/img/pope-francis.png"
          alt="Pope francis picture"
          layout="fill"
          objectFit="cover"
        />
        <div
          className="absolute w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 30%)",
          }}></div>
        <div className="relative z-1 lg:max-w-[1100px] mx-auto">
          <div className="px-4 pt-7 lg:pt-12">
            <Navbar />
            <div className="w-[214px] md:w-[368px] mt-1 bg-black bg-opacity-40 backdrop-filter backdrop-blur-md lg:mt-14 lg:w-[550px]">
              <div className="p-3 text-white lg:py-9 lg:px-7">
                <span className="text-sm font-light lg:text-lg">
                  What's your opinion on
                </span>
                <h2 className="mb-1 text-4xl leading-9 md:text-[28px] md:mb-5 lg:text-[54px] lg:leading-none">
                  Pope Francis?
                </h2>
                <p className="font-light leading-4 md:leading-4 md:text-lg lg:text-2xl lg:leading-6 lg:max-w-[432px]">
                  He's talking tough on clergy sexual abuse, or is he just
                  another pervert protector? (thumbs down) or a true pedophile
                  punishing pontiff? (thumbs up)
                </p>
                {isTablet && (
                  <div className="flex items-center mt-4">
                    <img
                      className=""
                      src="/img/wikipedia.svg"
                      alt="wikipedia logo"
                    />
                    <span className="ml-2 text-sm font-light underline lg:text-lg">
                      More information
                    </span>
                  </div>
                )}
                <span className="inline-block mt-4 text-xs font-bold md:text-xl lg:text-[27px]">
                  What's Your Veredict?
                </span>
              </div>
              <div className="grid grid-cols-2 md:mt-8 lg:mt-0">
                <ThumbUp className="lg:py-4" size="w-4 md:w-6 lg:w-9" />
                <ThumbDown className="lg:py-5" size="w-4 md:w-6 lg:w-9" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-1">
          <div className="flex items-stretch mt-6 md:mt-7">
            <div className="flex items-center justify-end bg-black md:h-10 bg-opacity-40 lg:h-auto md:w-4/12 lg:w-2/6">
              <p className="pl-8 pr-2 text-sm font-light text-white uppercase md:text-md lg:text-2xl">
                closing in
              </p>
            </div>
            <div className="triangle"></div>
            <div className="flex-grow py-1 -ml-2 text-lg font-light text-gray-700 bg-white bg-opacity-40 lg:text-4xl">
              <span className="ml-4 font-medium text-gray-900">22</span>
              days
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 mx-auto lg:max-w-[1100px] box-border">
        {/* Banner */}
        <div className="p-3 flex items-center mt-6 bg-[#ebebeb] text-light-gray justify-evenly md:py-6 lg:py-5 lg:px-3">
          <div className="flex-shrink-0 md:text-center lg:mr-5">
            <p className="text-sm font-light lg:text-lg">
              Speak out. Be heard.
            </p>
            <p className="text-2xl font-bold md:text-lg lg:text-2xl">
              Be counted
            </p>
          </div>
          <div className="text-sm font-light leading-4 md:text-lg md:leading-5 lg:max-w-[853px] ml-3 lg:ml-0">
            Rule of Thumb is a crowd sourced court of public opinion where
            anyone and everyone can speak out and speak freely. It's easy: You
            share your opinion, we analyze and put the data in a public report.
          </div>
          {isDesktop && (
            <img
              src="/img/close.svg"
              alt="close icon"
              className="ml-4 mr-2 cursor-pointer"
            />
          )}
        </div>
        <GridCelebrities celebrities={data} />
        {/* CTA */}
        <div className="relative mt-6 text-center bg-cover">
          <Image
            src="/img/bg-people.png"
            alt="Picture of crowded place"
            layout="fill"
            objectFit="cover"
          />
          <div className="relative z-10">
            <div className="px-8 py-4 bg-white bg-opacity-75 md:items-center md:flex md:h-28 lg:justify-between">
              <p className="mb-3 text-2xl leading-7 text-light-gray md:mr-4 md:text-xl lg:text-2xl">
                Is there anyone else you would want us to add?
              </p>
              <button className="w-full py-2 text-lg border-2 border-gray-700 md:py-3 md:flex-1 text-light-gray md:text-xl lg:text-2xl lg:max-w-[360px]">
                Submit a name
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[18px] mb-4 border-b-2 border-gray-700 border-dashed lg:my-9"></div>
        <footer className="flex items-center justify-between mb-8 text-light-gray md:mb-11 md:mt-10">
          <ul className="space-y-4 text-sm cursor-pointer md:text-lg md:flex md:space-y-0 md:space-x-4">
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
          <div className="self-end cursor-pointer md:flex">
            <span className="md:text-lg">Follow us</span>
            <div className="flex md:ml-3">
              <img
                width="24"
                height="24"
                src="img/facebook.svg"
                alt="facebook logo"
                className="mr-4"
              />
              <img
                src="img/twitter.svg"
                alt="twitter logo"
                width="26"
                height="23"
              />
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
