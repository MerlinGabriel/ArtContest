import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静态导出以支持 GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 通过环境变量注入 basePath / assetPrefix（在 GitHub Actions 中自动推导）
  basePath: process.env.NEXT_BASE_PATH || '',
  assetPrefix: process.env.NEXT_ASSET_PREFIX || undefined,
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
