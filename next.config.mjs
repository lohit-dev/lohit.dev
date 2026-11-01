/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes plain HTML, CSS and JS to ./out
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
