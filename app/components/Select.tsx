function Select({ placeholder }: { placeholder: string }) {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full md:w-72 rounded-xl border border-slate-200 px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        />
      </div>
    );
  }
  
export default Select;