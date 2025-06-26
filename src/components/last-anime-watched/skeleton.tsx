export function LastAnimeWatchedSkeleton() {
  return (
    <div className="flex flex-col gap-2 mt-5 animate-pulse">
      <div className="flex gap-4 items-center mb-2">
        <div className="w-6 h-6 bg-neutral-900 rounded-full"></div>
        <div className="w-40 h-4 bg-neutral-900 rounded"></div>
      </div>

      <div className="w-96 h-[140px] bg-neutral-900 rounded-lg"></div>
    </div>
  );
}
