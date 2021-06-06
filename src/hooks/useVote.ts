import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

type AddVoteArgs = {
  celebrityId: string;
  vote: "positive" | "negative";
};

function useVote() {
  const queryClient = useQueryClient();

  const addVote = useMutation(
    ({ celebrityId, vote }: AddVoteArgs) =>
      axios.post("/api/vote", {
        celebrityId,
        vote,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("celebrities");
      },
    }
  );

  return {
    addVote,
  };
}

export default useVote;
