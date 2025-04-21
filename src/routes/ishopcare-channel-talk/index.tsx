import { createFileRoute } from "@tanstack/react-router";

import LoadingPage from "@/components/commons/LoadingPage";

export const Route = createFileRoute("/ishopcare-channel-talk/")({
  component: HomeComponent,
  pendingComponent: () => <LoadingPage />,
});

function HomeComponent() {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-2/3">
      <h1 className="text-2xl font-bold mb-4">채널톡 파트 전용 대시보드</h1>
      <p className="text-center text-gray-600 mb-6">
        <span className="text-red-500">채널톡 파트</span>에게만 제공되는 기능으로, 일반 사용자에게는 제공되지 않습니다.
        <br />
      </p>
      <img
        src="https://framerusercontent.com/images/RzZ7S9CD9MwLV6fZUlSeGX61c.png"
        alt="intro"
        className="object-cover rounded-lg shadow-lg w-96"
      />
      <footer className="fixed text-md bottom-5 right-5 mt-6 text-gray-500">Made by Wade Oh</footer>
    </div>
  );
}
