import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  base: '/ishopcare-channel-talk/',
});
