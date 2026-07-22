import { useState } from "react";
import Header from "./Header";
import WelcomeArea from "./WelcomeArea";
import Input from "./Input";
import UserMsg from "./UserMsg";
import AiMsg from "./AiMsg";
import LoadingAnimation from "./LoadingAnimation";


const ChatArea = ({
  showSidebar,
  setShowSidebar,
  activeChat,
  setChats,
  chats,
  currentChat,
  theme,
}) => {
  const [loading, setLoading] = useState(false);
  const messages = currentChat?.messages ?? [];

  return (
    <div
      className={`flex h-screen  flex-col p-3 transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-white text-slate-900"
      } ${showSidebar ? "w-full md:w-[calc(100%-260px)]" : "w-full"}`}
    >
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        theme={theme}
      />

      <div className="flex-1 overflow-y-auto px-1 pb-4 pt-2">
        {!messages.length && <WelcomeArea />}

        {messages.map((msg, index) =>
          msg.sender === "user" ? (
            <UserMsg
              key={`${msg.sender}-${index}-${msg.text}`}
              message={msg.text}
              theme={theme}
            />
          ) : (
            <AiMsg
              key={`${msg.sender}-${index}-${msg.text}`}
              aimsg={msg.text}
              theme={theme}
            />
          ),
        )}

        {loading && <LoadingAnimation />}
      </div>

      <Input
        chats={chats}
        setChats={setChats}
        activeChat={activeChat}
        loading={loading}
        setLoading={setLoading}
        theme={theme}
      />
    </div>
  );
};

export default ChatArea;
