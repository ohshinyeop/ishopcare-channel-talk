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

import useStore from "@/store/store";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet, useRouter } from "@tanstack/react-router";
import { changeLanguage } from "i18next";
import { Home, Search } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
];

const LanguageList: {
  label: string;
  key: Language;
}[] = [
  { label: "Korean", key: "ko" },
  { label: "English", key: "en" },
];

function RootComponent() {
  const currentTitle = useStore((state) => state.currentTitle);
  const setCurrentTitle = useStore((state) => state.setCurrentTitle);
  const { t, i18n } = useTranslation("common");

  const handleChangeLanguage = (language: Language) => {
    changeLanguage(language).then(() => {
      setCurrentTitleFunc();
    });
  };

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
        <Outlet />
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
