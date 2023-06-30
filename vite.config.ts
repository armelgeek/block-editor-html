import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"],
    },
    // add this to cache all the
    // static assets in the public folder
    includeAssets: [
        "**/*",
    ],
      manifest: {
        theme_color: "#f69435",
        background_color: "#f69435",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "vite test",
        description: "testing vite pwa",
        name: "vite test",
        icons: [
          {
            src: "/vite.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/vite.svg",
            sizes: "256x256",
            type: "image/svg",
          },
          {
            src: "/vite.svg",
            sizes: "384x384",
            type: "image/svg",
          },
          {
            src: "/vite.svg",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
