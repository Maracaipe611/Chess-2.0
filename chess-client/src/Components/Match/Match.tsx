import useBoardClient from "../../client/Board/useBoardClient";
import { BoardPage } from "../Board";

const Match = () => {
  const analise = useBoardClient();

  return (
    <>
      <BoardPage />
      {
        console.log(analise)
      }
    </>
  );
};

export default Match;