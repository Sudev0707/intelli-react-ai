import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeading } from "./Utils";

const Answers = ({ ans, index, totalData }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeading(ans));
    }
  }, []);

  return (
    <>
      {index == 0 && totalData > 1 ? (
        <span className="pt-2 text-xl block ">{answer}</span>
      ) : heading ? (
        <span className="py-3 text-lg block">{answer}</span>
      ) : (
        <div className="pl-5">
          <span className=" text-sm">{answer}</span>
        </div>
      )}
    </>
  );
};

export default Answers;
