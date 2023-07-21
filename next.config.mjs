import { get } from '@vercel/edge-config';
import withPlaiceholder from '@plaiceholder/next';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  modularizeImports: {
    '@heathmont/moon-icons-tw/icons/?(((\\w*)?/?)*)': {
      transform: '@heathmont/moon-icons-tw/icons/{{ matches.[1] }}/{{member}}',
      //skipDefaultConversion: true,
    },
    '@heathmont/moon-core-tw': {
      transform: '@heathmont/moon-core-tw/{{member}}',
    },
  },
  staticPageGenerationTimeout: 300,
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'i.scdn.co', // Spotify Album Art
      'pbs.twimg.com', // Twitter Profile Picture
      'cdn.sanity.io',
      'abs.twimg.com',
      'www.notion.so',
      'flowbite.s3.amazonaws.com',
      'lh3.googleusercontent.com',
      'i.ytimg.com',
      'avatars.githubusercontent.com',
      'img1-tw.alphaxcdn.com',
    ],
  },
  /*   webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  }, */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  redirects() {
    try {
      return get('redirects');
    } catch {
      return [];
    }
  },
};

export default withPlaiceholder(nextConfig);
