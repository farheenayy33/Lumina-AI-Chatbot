import { FiSidebar } from "react-icons/fi";

const Header = ({ showSidebar, setShowSidebar, theme }) => {
  return (
    <div className="sticky top-0 z-10 flex h-12 items-center gap-4 px-2">
      {!showSidebar && (
        <FiSidebar
          className={`cursor-pointer text-lg ${theme === "dark" ? "text-slate-200" : "text-gray-500"}`}
          onClick={() => setShowSidebar(true)}
        />
      )}
      <h1 className="text-2xl font-bold">Lumina AI</h1>
    </div>
  );
};

export default Header;
