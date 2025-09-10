"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.cacheMiddleware = void 0;
// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cacheMiddleware = (duration = CACHE_DURATION) => {
    return (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }
        const key = `${req.originalUrl}`;
        const cached = cache.get(key);
        if (cached && Date.now() - cached.timestamp < duration) {
            console.log(`Cache hit for ${key}`);
            return res.json(cached.data);
        }
        // Store original res.json
        const originalJson = res.json.bind(res);
        // Override res.json to cache the response
        res.json = (body) => {
            cache.set(key, {
                data: body,
                timestamp: Date.now()
            });
            // Clean up old cache entries
            if (cache.size > 100) {
                const oldestKey = cache.keys().next().value;
                if (oldestKey) {
                    cache.delete(oldestKey);
                }
            }
            return originalJson(body);
        };
        next();
    };
};
exports.cacheMiddleware = cacheMiddleware;
// Clear cache for specific patterns
const clearCache = (pattern) => {
    if (!pattern) {
        cache.clear();
        return;
    }
    for (const key of cache.keys()) {
        if (key.includes(pattern)) {
            cache.delete(key);
        }
    }
};
exports.clearCache = clearCache;
//# sourceMappingURL=cache.js.map