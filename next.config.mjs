/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'l85fcot7a462d0mi.public.blob.vercel-storage.com',
            port: '',
        }]
    }
};

export default nextConfig;
