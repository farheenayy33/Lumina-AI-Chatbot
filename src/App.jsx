import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

const STORAGE_KEY = "lumina-chats";
const ACTIVE_CHAT_KEY = "lumina-active-chat";
const THEME_KEY = "lumina-theme";

const checkChats = (chatList) => {
  if (!Array.isArray(chatList)) return [];

  return chatList.filter(
    (chat) => Array.isArray(chat.messages) && chat.messages.length > 0,
  );
};

const createNewChatObject = () => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  title: "New Chat",
  createdAt: new Date().toISOString(),
  messages: [],
});

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme || "light";
  });

  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem(STORAGE_KEY);
    if (!savedChats) return [];

    try {
      return checkChats(JSON.parse(savedChats));
    } catch {
      return [];
    }
  });

  const [activeChat, setActiveChat] = useState(() => {
    const savedActiveChat = localStorage.getItem(ACTIVE_CHAT_KEY);
    return savedActiveChat ? Number(savedActiveChat) : null;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (activeChat !== null) {
      localStorage.setItem(ACTIVE_CHAT_KEY, String(activeChat));
    }
  }, [activeChat]);

  useEffect(() => {
    if (!chats.length) {
      const starterChat = createNewChatObject();
      setChats([starterChat]);
      setActiveChat(starterChat.id);
      return;
    }

    if (!activeChat || !chats.some((chat) => chat.id === activeChat)) {
      setActiveChat(chats[0].id);
    }
  }, [chats, activeChat]);

  const createNewChat = () => {
    const newChat = createNewChatObject();
    setChats((prevChats) => [newChat, ...prevChats]);
    setActiveChat(newChat.id);
    setShowSidebar(true);
  };

  const currentChat = useMemo(
    () => chats.find((chat) => chat.id === activeChat) ?? null,
    [chats, activeChat],
  );

  return (
    <div
      className={`h-screen overflow-hidden transition-colors duration-300 ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"}`}
    >
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          chats={chats}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setActiveChat={setActiveChat}
          createNewChat={createNewChat}
          activeChat={activeChat}
          theme={theme}
          setTheme={setTheme}
        />

        <ChatArea 
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          chats={chats}
          setChats={setChats}
          setActiveChat={setActiveChat}
          activeChat={activeChat}
          currentChat={currentChat}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default App;
