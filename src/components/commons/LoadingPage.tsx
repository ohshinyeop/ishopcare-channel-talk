/**
 * Renders a loading page component.
 * @returns The loading page component.
 */
export default function LoadingPage() {
  return (
    <div className="flex h-full w-full content-center items-center justify-center z-10 bg-gray-400 opacity-75">
      <div className="flex h-full w-full flex-row items-center justify-center gap-2">
        <div className="h-2 w-2 animate-bounce rounded-full bg-green-800"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-red-500 [animation-delay:-.3s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-700 [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}
