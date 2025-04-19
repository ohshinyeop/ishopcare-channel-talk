import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ishopcare-channel-talk/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  navigate({
    to: "/",
  });
  return null;
}
