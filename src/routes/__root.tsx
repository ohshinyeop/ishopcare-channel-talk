import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import { Button } from "@/components/ui/button";
import useStore from "@/store/store";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet, useRouter } from "@tanstack/react-router";
import { Home, Monitor, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { MY_PASSWORD } from "./ishopcare-channel-talk/dashboard";

type Language = "en" | "ko";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

const NAVI_LINKS: {
  to: string;
  label: string;
  icon: React.ComponentType;
}[] = [
  {
    to: "/ishopcare-channel-talk/",
    label: "홈",
    icon: Home,
  },
  {
    to: "/ishopcare-channel-talk/dashboard",
    label: "대시보드",
    icon: Search,
  },
  {
    to: "/ishopcare-channel-talk/report",
    label: "리포트",
    icon: Monitor,
  },
];

function RootComponent() {
  const currentTitle = useStore((state) => state.currentTitle);
  const setCurrentTitle = useStore((state) => state.setCurrentTitle);
  const { t } = useTranslation("common");

  const router = useRouter();

  const setCurrentTitleFunc = useCallback(() => {
    const match = NAVI_LINKS.find((naviLink) => naviLink.to === router.state.location.pathname);
    if (match) {
      setCurrentTitle(t(match.label));
    }
  }, [router, setCurrentTitle, t]);

  useEffect(() => {
    router.subscribe("onRendered", () => {
      setCurrentTitleFunc();
    });
  }, [router, setCurrentTitleFunc]);

  useEffect(() => {
    console.log("is production : ", import.meta.env.VITE_IS_PRODUCTION);
  }, []);

  const [auth, setAuth] = useState(false);

  const [inputPassword, setInputPassword] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const password = event.currentTarget.value;
      if (password === MY_PASSWORD) {
        setAuth(true);
      } else {
        setAuth(false);
        toast("Password incorrect", {
          icon: "❌",
        });
      }
    }
  };
  const handleClickSubmit = () => {
    if (inputPassword === MY_PASSWORD) {
      setAuth(true);
    } else {
      setAuth(false);
      toast("Password incorrect", {
        icon: "❌",
      });
    }
  };

  useEffect(() => {
    setInputPassword("");
    if (router.state.location.pathname === "/ishopcare-channel-talk") {
      setAuth(true);
    }
    // setExcelData([]);
    return () => {
      setInputPassword("");
      if (router.state.location.pathname === "/ishopcare-channel-talk") {
        setAuth(true);
      }
    };
  }, []);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="pb-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="py-0 hover:bg-transparent h-fit">
                <Link to="/ishopcare-channel-talk" className="flex items-center w-fit gap-2">
                  <img
                    src="https://framerusercontent.com/images/RzZ7S9CD9MwLV6fZUlSeGX61c.png"
                    alt="intro"
                    className="object-cover"
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{t("채널톡 파트")}</SidebarGroupLabel>
            <SidebarMenu>
              {NAVI_LINKS.map((naviLink) => {
                return (
                  <SidebarMenuItem key={naviLink.label}>
                    <SidebarMenuButton asChild>
                      <Link
                        key={naviLink.to}
                        to={naviLink.to}
                        activeProps={{
                          className: "font-extrabold",
                        }}
                        activeOptions={{ exact: true }}
                        className="flex items-center w-fit"
                      >
                        <naviLink.icon />
                        {t(naviLink.label)}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="w-full flex h-full flex-col">
        <div className="border-b border-gray-200 flex gap-2 p-2">
          <SidebarTrigger className="relative" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {currentTitle}
        </div>
        {!auth ? (
          <Outlet />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="mb-4 text-lg font-semibold">Enter Password</p>
            <Input
              type="password"
              onKeyDown={handleKeyDown}
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-fit"
              placeholder="Password"
            />
            <Button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleClickSubmit}>
              Submit
            </Button>
          </div>
        )}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
