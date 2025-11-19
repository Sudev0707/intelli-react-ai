import React from "react";

const LeftSidebar = ({
  isCollapsed,
  setIsCollapsed,
  newChat,
  clearSearches,
  recentQuestions,
  setSelectedHistory,
}) => {
  return (
    <div
      className={` bg-zinc-800 h-full transition-all duration-300
      ${isCollapsed ? "w-16 col-span-1" : "w-64 col-span-1"}`}
    >
      {/* Collapse Button */}
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white bg-zinc-700 px-2 py-1 rounded hover:bg-zinc-600"
        >
          {isCollapsed ? "➡" : "⬅"}
        </button>
      </div>

      {/* New Chat */}
      <div className="mb-3">
        <button
          onClick={newChat}
          className="hover:bg-zinc-700 w-full flex cursor-pointer text-md text-zinc-200 text-left pl-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
          </svg>
          New Chat
        </button>
      </div>

      <div className="flex justify-between">
        <h3 className="text-md text-zinc-200 text-left pl-5">Recent search</h3>

        <button
          onClick={clearSearches} // make sure function name is correct
          type="button"
          className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-zinc-700 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 -960 960 960"
            fill="#e3e3e3"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </div>

      {!isCollapsed && (
        <ul className="text-white p-4 text-left overflow-auto text-sm">
          {recentQuestions &&
          recentQuestions.filter(
            (item) => typeof item === "string" && item.trim() !== ""
          ).length > 0 ? (
            recentQuestions
              .filter((item) => typeof item === "string" && item.trim() !== "")
              .map((item, i) => (
                <li
                  onClick={() => setSelectedHistory(item)}
                  key={i}
                  className="rounded-sm block p-1 pl-4 text-zinc-300 cursor-pointer hover:bg-zinc-700 truncate"
                >
                  {item}
                </li>
              ))
          ) : (
            <li className="text-zinc-500 italic">No recent searches</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default LeftSidebar;
