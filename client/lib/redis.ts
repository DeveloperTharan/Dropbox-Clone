// lib/redis.ts

import { createClient } from 'redis';

// ⚠️ IMPORTANT: Set these environment variables in your .env.local file
// or your hosting platform's environment settings.
// This is the recommended Redis connection string format:
// redis://[username]:[password]@[host]:[port]
const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
    throw new Error('REDIS_URL environment variable is not set. Please set it to your Redis connection string.');
}

// 1. Configure the Client
// The createClient automatically infers connection type (TCP/TLS) from the URL scheme.
const client = createClient({
    url: REDIS_URL
});

// 2. Error Handling
client.on('error', err => {
    // Log the error but don't crash the server.
    console.error('--- Redis Client Error ---', err);
    console.error('Ensure your REDIS_URL is correct and the server is reachable.');
});

// 3. Connect (AWAIT is necessary for TCP connections)
// The connection should be established once when the application starts.
// We wrap this in an async function to call 'connect' and log the status.
async function connectRedis() {
    try {
        await client.connect();
        console.log('✅ Redis client connected successfully!');
    } catch (error) {
        // The error will also be caught by client.on('error', ...), but we log it here too
        // in case the error happens during the initial 'connect'.
        console.error('❌ Failed to connect to Redis during startup:', error);
    }
}

// In a real application, you call this once on startup.
// We export the client, and the caller handles connection/reconnection based on environment.
// For Next.js/Vercel, the connection might be managed by the platform.
connectRedis();


// 4. Export the Client
// Export the client so you can use it across your application.
// You do NOT need to call client.connect() again in your API routes/Server Components.
export { client };