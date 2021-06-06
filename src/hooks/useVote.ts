import axios from "axios";

type AddVoteArgs = {
  celebrityId: string;
  vote: "positive" | "negative";
};

function useVote() {
  const addVote = async ({ celebrityId, vote }: AddVoteArgs) => {
    try {
      const { data, status } = await axios.post("/api/vote", {
        celebrityId,
        vote,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addVote,
  };
}

export default useVote;
