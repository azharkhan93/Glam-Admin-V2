/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
        },
    ],
},
    // images: {
    //     domains: ['res.cloudinary.com'],
    //   },
}

module.exports = nextConfig
