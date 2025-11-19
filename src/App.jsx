import { useState, useEffect, useref } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GEMINI_URL } from "./constants";
import Answers from "./components/Answers";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [question, setQuestion] = useState("");
  const [data, setData] = useState([]);

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

      let unFormatData =
        result.candidates?.[0]?.content?.parts?.[0]?.text || "";

      let formatedData = unFormatData.includes("* ")
        ? unFormatData.split("* ").map((item) => item.trim())
        : [unFormatData];

      // setData([question, formatedData]);
      setData([
        ...data,
        { type: "q", text: question },
        { type: "a", text: formatedData },
      ]);
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

        <div className="col-span-4 p-10 ">
          <div className="container h-150 max-w-4xl   overflow-y-scroll chat-scroll">
            <div className="text-zinc-200 ">
              <ul>
                {data.map((item, index) =>
                  item.type == "q" ? (
                    <li key={index} className="flex justify-end mt-4">
                      <div className="max-w-[75%] bg-gradient-to-br from-[#1A1D21] to-[#2A2F34] text-white p-3 rounded-tl-4xl rounded-br-4xl rounded-bl-4xl  shadow-lg border border-white/10">
                        <Answers ans={item.text} index={index} totalData={1} />
                      </div>
                    </li>
                  ) : (
                    item.text.map((ansItem, ansIndex) => (
                      <li
                        key={ansIndex + Math.random()}
                        className="text-left p-1 text-white"
                      >
                        <Answers
                          ans={ansItem}
                          index={ansIndex}
                          totalData={item.length}
                        />
                      </li>
                    ))
                  )
                )}

                {/* {data?.map((item, index) => (
                  <li
                    key={index + Math.random()}
                    className="text-left p-1 text-white"
                  >
                    <Answers ans={item} index={index} totalData={data.length} />
                  </li>
                ))} */}
              </ul>
            </div>
          </div>

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
