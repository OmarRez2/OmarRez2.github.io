export function Parallax({ children, className }: { children: React.ReactNode; className?: string; distance?: number }) {
  return <div className={className}>{children}</div>;
}
