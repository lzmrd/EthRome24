export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center">
        <div className="w-16 h-16 border-8 border-dashed rounded-full border-primary animate-spin"></div>
        <p className="ml-4 text-lg">Loading...</p>
      </div>
    </div>
  );
}
