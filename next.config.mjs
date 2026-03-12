/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour O2Switch (Phusion Passenger)
  // O2Switch utilise Node.js natif, pas besoin de mode standalone
  // Mais on peut l'activer si nécessaire pour optimiser

  // Pour le développement avec Docker, on garde la config par défaut
  // Pour la production sur O2Switch, on peut activer :
  // output: 'standalone', // Décommentez pour O2Switch si nécessaire

  // Optimisations pour la production
  compress: true,

  // Images optimisées
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  // Headers de sécurité (utile pour O2Switch)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

