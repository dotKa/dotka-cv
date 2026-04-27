export function LogLine({ children }) {
  return (
    <div className="whitespace-nowrap text-slate-300">
      <span className="text-cyan-300">&gt;</span> {children}
    </div>
  );
}
