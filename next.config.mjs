// Old index-based case-study URLs -> current destinations.
const legacy = [
  '/#work', // 0: rccg-providence (no case study any more)
  '/#work', // 1: egmos-school (no case study any more)
  '/case-study/seyi-portfolio',
  '/case-study/notification-service',
  '/case-study/secure-todo-app',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      ...legacy.map((destination, i) => ({
        source: `/case-study/projects/${i}`,
        destination,
        permanent: true,
      })),
      // The embedded game page is gone; send old links to the live game.
      { source: '/color-flood', destination: 'https://color-fill-game.vercel.app', permanent: false },
    ];
  },
};

export default nextConfig;
