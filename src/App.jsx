import { useState, useEffect, useref} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="grid grid-cols-5 text-center ">
        <div className="col-span-1 bg-zinc-800 h-screen "></div>
        <div className="col-span-4 ">
          <div className="container h-110 "></div>

          <div className="bg-zinc-800 w-1/2 text-white m-auto rounded-4xl border border-zinc-500 flex h-16 " >
            <input type="text" placeholder="ask me anything" className="w-full h-full p-3 outline-none  " />
            <button>Ask</button>
          </div>
        </div>
 
      </div>
    </>
  );
}

export default App;
