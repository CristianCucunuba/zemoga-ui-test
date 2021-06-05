import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ThumbDown from "@components/ThumbDown";
import ThumbUp from "@components/ThumbUp";
import { Celebrity } from "../../types";

interface CardProps {
  celebrity: Celebrity;
}

const NOW = new Date();

function Card({ celebrity }: CardProps) {
  const {
    name,
    category,
    description,
    lastUpdated,
    votes: { positive, negative },
    picture,
  } = celebrity;

  const totalVotes = positive + negative;
  const upVotes = Math.round(((100 * positive) / totalVotes) * 10) / 10;
  const downVotes = Math.round(((100 * negative) / totalVotes) * 10) / 10;

  return (
    <div
      className="min-w-[19rem] bg-no-repeat bg-cover h-[18.5rem] text-white relative mr-4 flex items-center"
      style={{
        backgroundImage: `url(${picture})`,
      }}>
      <div className="">
        <div className="mr-8">
          <div className="flex mb-2">
            {positive >= negative ? (
              <ThumbUp className="self-end" />
            ) : (
              <ThumbDown className="self-end" />
            )}
            <div className="flex h-20 pl-1">
              <h4 className="self-end text-3xl leading-9 line-clamp-2">
                {name}
              </h4>
            </div>
          </div>
          <div className="pl-1 ml-8">
            <p className="mb-2 text-sm line-clamp-2">{description}</p>
            <p className="text-xs font-medium text-right">
              {formatDistanceStrict(new Date(lastUpdated), NOW)} ago in{" "}
              <span className="capitalize">{category}</span>
            </p>
            <div className="flex items-center justify-end mt-2 space-x-2 ">
              <ThumbUp />
              <ThumbDown />
              <button className="px-4 py-2 bg-black border border-white outline-none bg-opacity-60">
                Vote now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex justify-between w-full h-9 bg-opacity-70">
        <div
          className="bg-[#3cbbb4] opacity-80"
          style={{
            width: `${upVotes}%`,
          }}></div>
        <div
          className="bg-[#f9ad1d] opacity-80"
          style={{
            width: `${downVotes}%`,
          }}></div>
        <div className="absolute flex justify-between w-full h-full">
          <div>
            <ThumbUp />
            <span className="text-lg">{upVotes}%</span>
          </div>
          <div>
            <span className="text-lg">{downVotes}%</span>
            <ThumbDown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
