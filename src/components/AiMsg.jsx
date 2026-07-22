import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const AiMsg = ({ aimsg, theme }) => {
  return (
    <div className="m-3 flex justify-start">
      <div
        className={`max-w-[85%] rounded-3xl  px-4 py-2 text-[16px] shadow-sm md:text-base border border-slate-50 ${
          theme === "dark" ? "text-white" : "text-slate-900 bg-slate-100"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{aimsg}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AiMsg;
