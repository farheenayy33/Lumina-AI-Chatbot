import { useMemo, useState } from "react";
import { FaEdit, FaSearch, FaUserCircle } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { IoChatbubbleEllipsesSharp, IoSettings } from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";
import Logo from "../assets/Images/LuminaLogo.webp";

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  createNewChat,
  setActiveChat,
  chats,
  searchTerm,
  setSearchTerm,
  activeChat,
  theme,
  setTheme,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const filteredChats = useMemo(() => {
    const loweredSearch = searchTerm.trim().toLowerCase();

    const realChats = chats.filter((chat) => chat.messages.length > 0);

    if (!loweredSearch) return realChats;

    return realChats.filter((chat) => {
      const titleMatches = chat.title?.toLowerCase().includes(loweredSearch);
      const messageMatches = chat.messages.some((message) =>
        message.text.toLowerCase().includes(loweredSearch),
      );

      return titleMatches || messageMatches;
    });
  }, [chats, searchTerm]);

  const sidebarThemeClass =
    theme === "dark"
      ? "border-slate-800 bg-slate-900 text-slate-100"
      : "border-slate-300 bg-slate-50 text-slate-900";

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-30 flex h-screen flex-col overflow-hidden border-r transition-all duration-300 md:relative md:translate-x-0 ${sidebarThemeClass} ${
          showSidebar
            ? "translate-x-0 w-[260px]"
            : "-translate-x-full w-[260px] md:w-0"
        }`}
      >
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt="Lumina AI logo"
                className="size-8 rounded-full"
              />
              <h1 className="text-lg font-bold">Lumina AI</h1>
            </div>
            <button
              className="text-lg text-gray-500"
              onClick={() => setShowSidebar(false)}
              title="Close panel"
            >
              <FiSidebar />
            </button>
          </div>

          <div className="mx-3 mb-2 flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2">
            <FaSearch className="text-slate-500" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search chats"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button
            type="button"
            className="mx-3 mb-2 flex items-center gap-2 rounded-xl px-2 py-2 text-base font-semibold text-slate-700 transition hover:bg-slate-200"
            onClick={createNewChat}
            title="New Chat"
          >
            <FaEdit />
            <span>New Chat</span>
          </button>

          <div className="mx-3 mb-2 flex items-center gap-2 rounded-xl px-3 py-2 font-semibold">
            <IoChatbubbleEllipsesSharp />
            <span>Chats</span>
          </div>

          <div className="flex-1 overflow-y-auto px-3">
            <ul className="space-y-2">
              {filteredChats.map((chat) => (
                <li key={chat.id}>
                  <button
                    type="button"
                    onClick={() => setActiveChat(chat.id)}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                      activeChat === chat.id
                        ? "bg-slate-200 text-slate-900"
                        : "hover:bg-slate-200"
                    }`}
                  >
                    {chat.title || "Untitled Chat"}
                  </button>
                </li>
              ))}

              {!filteredChats.length && (
                <li className="rounded-xl border border-dashed px-3 py-4 text-sm text-slate-500">
                  No chats found.
                </li>
              )}
            </ul>
          </div>
        </div>

        <footer className="shrink-0 border-t border-slate-300 px-2 py-2">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold transition hover:bg-slate-200"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <IoSettings />
            <span>Settings</span>
          </button>

          {showSettings && (
            <div
              className={`mt-2 rounded-xl border p-3 text-sm ${
                theme === "dark"
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-300 bg-white"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span>Theme</span>

                <button
                  type="button"
                  onClick={() =>
                    setTheme((prevTheme) =>
                      prevTheme === "light" ? "dark" : "light",
                    )
                  }
                  className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${
                    theme === "dark" ? "bg-slate-700" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                      theme === "dark" ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          <div className="flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold hover:bg-slate-200">
            <FaUserCircle />
            <span>Profile</span>
          </div>

          <div className="flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold">
            <SiGooglegemini className="text-blue-600" />
            <span>Powered by Gemini</span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Sidebar;
