/** @type {import('next').NextConfig} */

const nextConfig = {
  //以下を追加
  devIndicators: false,

  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
