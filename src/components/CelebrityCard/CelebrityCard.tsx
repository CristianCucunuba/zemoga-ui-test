import { Fragment, useState } from "react";
import Image from "next/image";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import useVote from "@hooks/useVote";
import ThumbDown from "@components/ThumbDown";
import ThumbUp from "@components/ThumbUp";
import { Celebrity } from "../../types";

interface CelebrityCardProps {
  celebrity: Celebrity;
  listView: "grid" | "list";
}

type Vote = "positive" | "negative";

const NOW = new Date();

function CelebrityCard({ celebrity, listView }: CelebrityCardProps) {
  const {
    _id,
    name,
    category,
    description,
    lastUpdated,
    votes: { positive, negative },
    picture,
  } = celebrity;

  const [vote, setVote] = useState<Vote | null>();
  const [hasVoted, setHasVoted] = useState(false);
  const { addVote } = useVote();

  const totalVotes = positive + negative;
  const positiveVotes = Math.round(((100 * positive) / totalVotes) * 10) / 10;
  const negativeVotes = Math.round(((100 * negative) / totalVotes) * 10) / 10;

  const handleVote = () => {
    if (hasVoted) {
      setHasVoted(false);
      return;
    }
    if (!vote) return;
    addVote.mutate({ celebrityId: _id, vote });
    setHasVoted(true);
    setVote(null);
  };

  const isListView = listView === "list";

  return (
    <div
      className={`flex items-center relative flex-shrink-0 w-[300px] h-[300px] bg-gray-100 mr-3 text-white md:w-full ${
        isListView ? "md:h-36 items-start lg:h-[170px]" : "md:h-[351px]"
      }`}>
      {isListView ? (
        <div className="absolute w-40 h-full">
          <Image
            src={picture}
            alt={`${name} picture`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <Image
          src={picture}
          alt={`${name} picture`}
          layout="fill"
          objectFit="cover"
        />
      )}
      <div
        className="absolute z-0 w-full h-full"
        style={{
          background: !isListView
            ? `linear-gradient(0deg,rgba(0,0,0,0.5) 10%, rgba(0,0,0,0) 80%)`
            : `linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 19.79%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%)`,
        }}></div>
      <div className="relative z-1">
        <div
          className={`mr-8 lg:mr-4 ${
            isListView
              ? "md:flex md:mr-4 md:ml-32 md:justify-between"
              : "md:pt-11"
          }`}>
          <div
            className={`absolute top-1/4 ${
              isListView ? "md:top-0 left-0" : "md:top-[87px]"
            }`}>
            {positive >= negative ? (
              <ThumbUp className="self-end" />
            ) : (
              <ThumbDown className="self-end" />
            )}
          </div>
          <div className="pl-1 ml-8 md:pl-3">
            <div className={`flex h-20 ${isListView && "md:h-auto"}`}>
              <h4
                className={`self-end text-3xl leading-9 line-clamp-2 lg:text-4xl ${
                  isListView && "md:line-clamp-1"
                }`}>
                {name}
              </h4>
            </div>
            <p
              className={`mb-2 text-sm line-clamp-2 ${
                isListView ? "md:mr-6 md:mt-4" : "md:mt-1"
              }`}>
              {description}
            </p>
          </div>
          <div
            className={`flex flex-col flex-shrink-0 ${
              isListView && "md:justify-center"
            }`}>
            <p className="text-xs font-medium text-right">
              {hasVoted ? (
                "Thank you for your vote!"
              ) : (
                <Fragment>
                  {formatDistanceStrict(new Date(lastUpdated), NOW)} ago in{" "}
                  <span className="capitalize">{category}</span>
                </Fragment>
              )}
            </p>
            <div className="flex items-center justify-end mt-2 space-x-2">
              {!hasVoted && (
                <Fragment>
                  <ThumbUp
                    className={`${
                      vote === "positive" ? "border-2" : "border-0"
                    }  border-white`}
                    onClick={() => setVote("positive")}
                  />
                  <ThumbDown
                    className={`${
                      vote === "negative" ? "border-2" : "border-0"
                    }  border-white`}
                    onClick={() => setVote("negative")}
                  />
                </Fragment>
              )}
              <button
                onClick={handleVote}
                className="px-4 py-2 bg-black border border-white bg-opacity-60 focus:outline-none"
                disabled={!vote && !hasVoted}>
                {hasVoted ? "Vote Again" : "Vote Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex justify-between w-full h-9 bg-opacity-70">
        <div
          className="bg-[#3cbbb4] opacity-60"
          style={{
            width: `${positiveVotes}%`,
          }}></div>
        <div
          className="bg-[#f9ad1d] opacity-60"
          style={{
            width: `${negativeVotes}%`,
          }}></div>
        <div className="absolute flex justify-between w-full h-full">
          <div>
            <ThumbUp className="h-full bg-opacity-0" />
            <span className={`${isListView ? "md:text-2xl" : "text-lg"}`}>
              {positiveVotes}%
            </span>
          </div>
          <div>
            <span className={`${isListView ? "md:text-2xl" : "text-lg"}`}>
              {negativeVotes}%
            </span>
            <ThumbDown className="h-full bg-opacity-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CelebrityCard;
