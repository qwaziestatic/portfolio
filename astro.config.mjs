import { defineConfig } from "astro/config";

// Static output. Azure Static Web Apps serves the dist/ folder.
export default defineConfig({
  output: "static",
  trailingSlash: "always",
});
