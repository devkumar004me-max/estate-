import { FluidGlass } from './FluidGlass';

export function FluidGlassBackground() {
  return (
    <div className="fixed inset-0 z-[-1] opacity-50 pointer-events-none">
      <FluidGlass scale={0.1} />
    </div>
  );
}
