import { useState, useEffect, useref } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GEMINI_URL } from "./constants";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [question, setQuestion] = useState("");
  const [data, setData] = useState("");

  const GEMINI_API_KEY = "AIzaSyDgrivbfetqlWmpRyCm6cKvgkN7qNLZczQ";

  const payload = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };

  const askQuestion = async () => {
    try {
      let res = await fetch(GEMINI_URL + GEMINI_API_KEY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      setData(result.candidates[0].content.parts[0].text);

      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 text-center h-screen">
        {/* left sidebar */}
        <div
          className={` col-span-1 bg-zinc-800 h-full transition-all duration-300
        ${isCollapsed ? "w-16 col-span-1" : "w-64 col-span-1"} `}
        >
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white bg-zinc-700 px-2 py-1 rounded hover:bg-zinc-600"
            >
              {isCollapsed ? "➡" : "⬅"}
            </button>
          </div>
          {!isCollapsed && (
            <ul className="text-white p-4 space-y-4">
              {/* <li className="cursor-pointer hover:text-gray-300">New Chat</li>
              <li className="cursor-pointer hover:text-gray-300">History 1</li>
              <li className="cursor-pointer hover:text-gray-300">History 2</li> */}
            </ul>
          )}
        </div>

        <div className="col-span-4 p-10">
          <div className="container h-150 overflow-scroll ">{data}</div>

          <div className="  bg-zinc-800 w-1/2 p-1 pr-4  text-white m-auto rounded-4xl border border-zinc-700 flex h-16 ">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              placeholder="ask me anything"
              className="w-full h-full p-3 outline-none  "
            />
            <button onClick={askQuestion} className="cursor-pointer">
              Ask
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
