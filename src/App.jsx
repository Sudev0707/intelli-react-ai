import { useState, useEffect, useRef } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GEMINI_URL } from "./constants";
import Answers from "./components/Answers";
import Spinner from "./components/Spinner";
import SideBar from "./components/SideBar";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [question, setQuestion] = useState("");
  const [data, setData] = useState([]);
  const [recentQuestions, setRecentQuestions] = useState(
    JSON.parse(localStorage.getItem("questions"))
  );
  const [selectdHistory, setSelectedHistory] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const scroll_Up = useRef(null);

  const GEMINI_API_KEY = "AIzaSyDgrivbfetqlWmpRyCm6cKvgkN7qNLZczQ";

  const askQuestion = async () => {
    const userQuery = question || selectdHistory;
    if (!userQuery) return;

    if (question) {
      // get old history or empty list
      let oldHistory = JSON.parse(localStorage.getItem("questions")) || [];

      // remove if exists (avoid duplicates)
      oldHistory = oldHistory.filter((q) => q !== question);

      // add new question at top
      const newHistory = [question, ...oldHistory];

      // save to localStorage
      localStorage.setItem("questions", JSON.stringify(newHistory));

      // update state correctly
      setRecentQuestions(newHistory);
    }

    // Add user message to conversation
    const newConversation = [
      ...conversation,
      { role: "user", text: userQuery },
    ];

    setConversation(newConversation);

    setLoading(true);

    // Send full conversation to Gemini
    const payload = {
      contents: newConversation.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    };

    let res = await fetch(GEMINI_URL + GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    const answer = json.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Add AI answer to conversation
    setConversation((prev) => [...prev, { role: "model", text: answer }]);

    // Also push into your chat UI
    setData((prev) => [
      ...prev,
      { type: "q", text: userQuery },
      { type: "a", text: [answer] },
    ]);

    setQuestion("");

    scroll_Up.current.scrollTo({
      top: scroll_Up.current.scrollHeight,
      behavior: "smooth",
    });
    setLoading(false);
  };

  // const askQuestion = async () => {
  //   if (!question && !selectdHistory) return;

  //   // if (question) {
  //   //   // for questions history
  //   //   if (localStorage.getItem("questions")) {
  //   //     let history = JSON.parse(localStorage.getItem("questions"));
  //   //     history = [question, ...history];

  //   //     localStorage.setItem("questions", JSON.stringify(history));
  //   //     setRecentQuestions([history]);
  //   //   } else {
  //   //     localStorage.setItem("questions", JSON.stringify([question]));
  //   //     setRecentQuestions([question]);
  //   //   }

  //   // }

  //   if (question) {
  //     // load existing or empty list
  //     let oldHistory = JSON.parse(localStorage.getItem("questions")) || [];

  //     // remove the question if it already exists
  //     oldHistory = oldHistory.filter((q) => q !== question);

  //     // add new question at the top
  //     const newHistory = [question, ...oldHistory];

  //     // save
  //     localStorage.setItem("questions", JSON.stringify(newHistory));

  //     // update UI
  //     setRecentQuestions(newHistory);
  //   }

  //   const payloadData = question ? question : selectdHistory;
  //   const payload = {
  //     contents: [
  //       {
  //         parts: [{ text: payloadData }],
  //       },
  //     ],
  //   };

  //   try {
  //     let res = await fetch(GEMINI_URL + GEMINI_API_KEY, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     const result = await res.json();

  //     let unFormatData =
  //       result.candidates?.[0]?.content?.parts?.[0]?.text || "";

  //     let formatedData = unFormatData.includes("* ")
  //       ? unFormatData.split("* ").map((item) => item.trim())
  //       : [unFormatData];

  //     // let formatedData = unFormatData.includes("* ")
  //     //   ? unFormatData
  //     //       .split("* ")
  //     //       .map((item) => item.trim())
  //     //       .filter(Boolean)
  //     //   : unFormatData
  //     //       .split(/[0-9]+\.\s+/)
  //     //       .map((i) => i.trim())
  //     //       .filter(Boolean);

  //     // setData([question, formatedData]);
  //     setData([
  //       ...data,
  //       { type: "q", text: question ? question : selectdHistory },
  //       { type: "a", text: formatedData },
  //     ]);

  //     setQuestion("");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const clearSearches = () => {
    localStorage.removeItem("questions");
    setRecentQuestions([]);
  };

  const isEnter = (e) => {
    if (e.key == "Enter") {
      askQuestion();
      setQuestion("");
    }
  };

  useEffect(() => {
    // console.log(typeof selectdHistory);
    askQuestion();
    setQuestion("");
  }, [selectdHistory]);

  const newChat = () => {
    setData([]);
  };

  // dark mode
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    console.log(theme);

    if (theme === "dark") {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme]);

  return (
    <>
      <div className={theme == 'dark' ? 'dark' : 'light'} >
        <div className="grid grid-cols-5 text-center h-screen ">
          {/* left sidebar */}
          <div className="col-span-1 h-full">
            <SideBar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              newChat={newChat}
              clearSearches={clearSearches}
              recentQuestions={recentQuestions}
              setSelectedHistory={setSelectedHistory}
            />
            <div className="fixed bottom-10 left-5 z-50">
              <select
                onChange={(e) => setTheme(e.target.value)}
                name="theme"
                id="theme-select"
                className=" bg-zinc-800 text-white outline-none  px-4 py-2 rounded-lg   transition-colors duration-200 " >
                <option value="dark" className="bg-zinc-800 text-white">
                  Dark
                </option>
                <option value="light" className=" bg-zinc-800 text-white">
                  Light
                </option>
              </select>
            </div>
          </div>

          <div className="col-span-4 p-10 flex flex-col items-center ">
            <h1 className="py-1 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-800  ">
              Hello, Ask me anything
            </h1>

            {loading && (
              <div className="flex items-center justify-center">
                <Spinner size={50} />
              </div>
            )}

            <div
              ref={scroll_Up}
              className=" pb-15  container h-160  max-w-6xl  overflow-y-scroll chat-scroll"
            >
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

            <div className="mt-2 fixed bottom-15   items-center   bg-zinc-800 w-2xl  p-1 pr-4  text-white m-auto rounded-4xl border border-zinc-700 flex h-16 ">
              <input
                onKeyDown={isEnter}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                placeholder="ask me anything"
                className="w-full h-full p-3 outline-none  "
              />
              {!question == "" && (
                <button
                  onClick={askQuestion}
                  className="cursor-pointer flex py-1.5 px-4 rounded-4xl bg-zinc-600  "
                >
                  Ask
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
