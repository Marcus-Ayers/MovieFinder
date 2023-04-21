import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "fs";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // generate a _redirects file in the output directory
        // with the redirect rule for client-side routing
        intro: () => {
          writeFileSync("_redirects", "/*    /index.html   200");
          return "";
        },
      },
    },
  },
});
