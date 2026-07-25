import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // 1. Enable Static Export for your VPS
  output: "export",

  // 2. Disable default image optimization (required for static export)
  images: {
    unoptimized: true,
  },

  // 3. Keep your existing page extension settings
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Optional: Add other Next.js 16/15 features if needed
  // reactCompiler: true, 
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-math"],
    rehypePlugins: ["rehype-katex"],
  },
});

// Merge and export
export default withMDX(nextConfig);