export function Panel({ children, className = "" }) {
  return <div className={`border border-white/10 bg-white/[0.035] ${className}`}>{children}</div>;
}
