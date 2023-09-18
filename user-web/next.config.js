const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lecheng-static.oss-cn-beijing.aliyuncs.com'],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  // pwa:{
  //   dest: "public",
  //   register: true,
  //   skipWaiting: true,
  // },
  assetPrefix: isProd ? process.env.CDN_URL  : '',
  // webpack(config) {
  //   config.resolve.alias['@'] = path.resolve(__dirname)
  //   // for next@12, try `config.module.rules[2]...`
  //   config.module.rules[2].oneOf.forEach((one) => {
  //     if (!`${one.issuer?.and}`.includes('_app')) return;
  //     one.issuer.and = [path.resolve(__dirname)]
  //   })
  //   return config
  // },
}

// module.exports = withPWA(nextConfig)
module.exports = nextConfig

