export function AnimatedBackground() {
  return <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -left-48 -top-48 size-[34rem] rounded-full bg-primary/6 blur-[100px]" />
    <div className="absolute -right-48 top-1/3 size-[38rem] rounded-full bg-primary/5 blur-[110px]" />
    <div className="ambient-data-grid absolute inset-0 opacity-[0.07]" />
  </div>;
}
