/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"], 
 },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(wav|mp3)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "/static/audios/",
            publicPath: "/_next/static/audios/",
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
