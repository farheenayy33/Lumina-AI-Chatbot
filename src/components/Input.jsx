import axios from "axios";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const Input = ({ setChats, activeChat, loading, setLoading, theme }) => {
  const [input, setInput] = useState("");

  // const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API;
  // const GEMINI_MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash";
  // const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

 const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;
 const COHERE_MODEL = "command-r7b-12-2024";
 const COHERE_URL = "https://api.cohere.com/v2/chat";

  const inputHandler = async () => {
    const normalizedInput = input.trim();

    if (!normalizedInput || !activeChat || loading) return;

    const currentMessage = normalizedInput;
    setInput("");
    setLoading(true);

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat
          ? {
              ...chat,
              title:
                chat.title && chat.title !== "New Chat"
                  ? chat.title
                  : currentMessage.slice(0, 32),
              messages: [
                ...chat.messages,
                {
                  sender: "user",
                  text: currentMessage,
                },
              ],
            }
          : chat,
      ),
    );

    try {
      
      // const response = await axios.post(
      //   GEMINI_URL,
      //   {
      //     contents: [
      //       {
      //         parts: [
      //           {
      //             text: `You are a helpful AI assistant. Give concise answers using simple language.\n\nUser question:\n${currentMessage}`,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   },
      // );

      const response = await axios.post(
        COHERE_URL,
        {
          model: COHERE_MODEL,
         messages: [
  {
    role: "system",
    content:
      "You are a helpful AI assistant. Answer questions briefly and directly. Keep responses under 3-5 sentences. Use bullet points when helpful. Do not give long explanations unless the user asks for details."
  },
  {
    role: "user",
    content: currentMessage,
  },
],
        },
        {
          headers: {
            Authorization: `Bearer ${COHERE_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

 const aiResponse =
   response?.data?.message?.content?.[0]?.text ||
   "I couldn't generate a response right now.";

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    sender: "Ai",
                    text: aiResponse,
                  },
                ],
              }
            : chat,
        ),
      );
    } catch (error) {
      const apiErrorMessage =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Cohere request failed.";

      console.error("Cohere  error:", apiErrorMessage);

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    sender: "Ai",
                    text: "Sorry, I could not get a response from Cohere . Please check your API key / model access and try again.",
                  },
                ],
              }
            : chat,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      inputHandler();
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-2 pb-3">
      <div
        className={`flex w-full max-w-3xl items-center rounded-full border px-4 py-2 shadow-sm md:w-[85%] ${
          theme === "dark"
            ? "border-slate-700 bg-slate-800"
            : "border-slate-300 bg-white"
        }`}
      >
        <textarea
          rows={1}
          value={input}
          placeholder="Ask anything..."
          className={`flex-1 resize-none overflow-y-auto bg-transparent px-3 py-1 leading-6 outline-none ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          onClick={inputHandler}
          disabled={loading}
          className="disabled:opacity-50"
        >
          <IoMdSend className="cursor-pointer text-2xl transition hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default Input;
