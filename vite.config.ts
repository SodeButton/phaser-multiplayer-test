import { defineConfig } from "vite";

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  base: "/phaser-multiplayer-test/",
  envDir: "./",
  server: {
    port: 5500,
  },
});
