import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "AIChatWidget",
      fileName: (format) => {
        // Change the file extension to .js for UMD build
        if (format === "umd") {
          return "ai-chat-widget.umd.js";
        }
        return `ai-chat-widget.${format}.js`;
      },
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
