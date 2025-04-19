import { useEffect, useState } from "react";

interface ErrorLogProps {
  filePath: string | undefined;
  errorLine: string | undefined;
  error: Error | null;
}

/**
 * Renders an error page with error details and stack trace.
 * @param error - The error object.
 * @param filePath - The file path where the error occurred.
 */

export default function ErrorPage({ error, filePath }: { error: Error; filePath: string }) {
  // error state
  const [errorLog, setErrorLog] = useState<ErrorLogProps>({
    filePath: filePath,
    errorLine: "",
    error: error,
  });

  const [stackLines, setStackLines] = useState<string[]>();

  useEffect(() => {
    const stackLines = error.stack?.split("\n").slice(0, 3) || [];
    const callerLine = stackLines.find((line, i) => !line.includes("node_modules") && i > 0);
    const match = callerLine?.match(/(http.*):(\d+):(\d+)/);

    if (match) {
      setStackLines(stackLines);
      setErrorLog({
        filePath: match[1]?.split("src")[1]?.split("?")[0],
        errorLine: match[2],
        error: error,
      });

      /**
       * @TODO
       * send to server for logging
       */
    }
  }, [error]);

  const genereateRandom = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-fit text-sm leading-5 flex flex-col gap-4">
        <div className="rounded-lg p-4 bg-red-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-400 w-5 h-5"
              >
                <path
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="ml-5 flex flex-col w-full">
              <p className="text-red-900 text-sm leading-5 font-bold">Something went wrong</p>
              <div className="mt-2 text-red-700 text-sm leading-5">
                <ul className="pl-5 mt-1 list-disc" role="list">
                  <li>Message : {error.message}</li>
                  <li>File : {errorLog.filePath}</li>
                  <li>Line : {errorLog.errorLine}</li>
                  <div className="w-fit h-fit border border-red-300 rounded-lg p-2 mt-2">
                    {stackLines?.map((item) => {
                      return <div key={item + genereateRandom()}>{item}</div>;
                    })}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
