import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "AIChatWidget",
      formats: ["umd", "es"],
      fileName: (format) => `ai-chat-widget.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          marked: "marked",
        },
        extend: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "ai-chat-widget.css";
          return assetInfo.name;
        },
      },
      external: ["marked"],
    },
  },
});
