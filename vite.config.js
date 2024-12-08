import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "AIChatWidget",
      fileName: "ai-chat-widget",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "ai-chat-widget.css";
          return assetInfo.name;
        },
      },
    },
  },
});
