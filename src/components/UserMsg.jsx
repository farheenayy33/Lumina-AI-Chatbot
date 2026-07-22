const UserMsg = ({ message,theme }) => {
  return (
    <div className="m-3 flex justify-end">
      <div
        className={`max-w-[80%] rounded-3xl px-4 py-2 text-base  md:text-lg border-1 border-slate-50 ${
          theme === "dark" ? "text-white" : "text-slate-900 bg-slate-200"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default UserMsg;
