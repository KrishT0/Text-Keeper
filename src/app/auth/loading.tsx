export default function AuthLoading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-label="Loading authentication page"
    >
      <div className="flex items-center gap-2 text-sm text-[#949592]">
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-[#949592] border-t-transparent"
          aria-hidden="true"
        />
        Loading...
      </div>
    </div>
  );
}
