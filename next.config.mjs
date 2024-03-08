/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'blog-app-sigma-eight.vercel.app' ], 
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(wav|mp3)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/static/audios/',
            publicPath: '/_next/static/audios/', 
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
