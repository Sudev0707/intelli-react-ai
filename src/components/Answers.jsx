import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeading } from "./Utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from "react-markdown"

const Answers = ({ ans, index, totalData }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeading(ans));
    }
  }, []);

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter {...props} children={String(children).replace(/\n$/, '')} language={match[1]} style={dark} PreTag="div" />
      ) : (
        <code {...props} className={className} >{children}</code>
      )
    }
  }

  return (
    <>
      {index == 0 && totalData > 1 ? (
        <span className="pt-2 text-xl block ">{answer}</span>
      ) : heading ? (
        <span className="py-3 text-lg block">{answer}</span>
      ) : (
        <div className="pl-5">
          <span className=" text-sm">
            <ReactMarkdown components={renderer} >{answer}</ReactMarkdown>
          </span>
        </div>
      )}
    </>
  );
};

export default Answers;
