import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "AIChatWidget", // This needs to match the global variable name
      formats: ["umd", "es"],
      fileName: (format) => `ai-chat-widget.${format}.js`,
    },
    rollupOptions: {
      output: {
        // Ensure the UMD build creates a global variable
        globals: {
          marked: "marked", // External dependency
        },
        extend: true, // Extend the global variable
      },
      external: ["marked"], // Mark marked as external
    },
  },
});
