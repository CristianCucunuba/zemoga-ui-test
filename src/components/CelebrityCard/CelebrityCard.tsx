import { Fragment, useState } from "react";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import ThumbDown from "@components/ThumbDown";
import ThumbUp from "@components/ThumbUp";
import { Celebrity } from "../../types";
import useVote from "@hooks/useVote";

interface CelebrityCardProps {
  celebrity: Celebrity;
}

type Vote = "positive" | "negative";

const NOW = new Date();

function CelebrityCard({ celebrity }: CelebrityCardProps) {
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
              {hasVoted ? (
                "Thank you for your vote"
              ) : (
                <Fragment>
                  {formatDistanceStrict(new Date(lastUpdated), NOW)} ago in{" "}
                  <span className="capitalize">{category}</span>
                </Fragment>
              )}
            </p>
            <div className="flex items-center justify-end mt-2 space-x-2 ">
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
          className="bg-[#3cbbb4] opacity-80"
          style={{
            width: `${positiveVotes}%`,
          }}></div>
        <div
          className="bg-[#f9ad1d] opacity-80"
          style={{
            width: `${negativeVotes}%`,
          }}></div>
        <div className="absolute flex justify-between w-full h-full">
          <div>
            <ThumbUp />
            <span className="text-lg">{positiveVotes}%</span>
          </div>
          <div>
            <span className="text-lg">{negativeVotes}%</span>
            <ThumbDown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CelebrityCard;
