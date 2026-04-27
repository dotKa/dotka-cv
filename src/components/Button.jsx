export function Button({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-3 text-left text-sm uppercase tracking-[0.14em] transition ${
        active
          ? "border-cyan-300 bg-cyan-300 text-slate-950"
          : "border-white/15 bg-black text-slate-300 hover:border-cyan-300 hover:bg-cyan-300/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
