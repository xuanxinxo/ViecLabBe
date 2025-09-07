"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = exports.authLimiter = exports.rateLimit = void 0;
const rateLimitStore = {};
const rateLimit = (options) => {
    const windowMs = options.windowMs ?? 15 * 60 * 1000;
    const max = options.max ?? 100;
    const message = options.message ?? 'Too many requests, please try again later';
    return (req, res, next) => {
        const ip = req.ip || 'unknown';
        const now = Date.now();
        const windowStart = now - windowMs;
        // Initialize or reset the request count for this IP
        if (!rateLimitStore[ip] || rateLimitStore[ip].resetTime <= windowStart) {
            rateLimitStore[ip] = {
                count: 0,
                resetTime: now + windowMs,
            };
        }
        // Increment the request count
        rateLimitStore[ip].count++;
        // Check if the request limit has been exceeded
        if (rateLimitStore[ip].count > max) {
            const retryAfter = Math.ceil((rateLimitStore[ip].resetTime - now) / 1000);
            res.setHeader('Retry-After', retryAfter);
            res.setHeader('X-RateLimit-Limit', max.toString());
            res.setHeader('X-RateLimit-Remaining', '0');
            res.setHeader('X-RateLimit-Reset', rateLimitStore[ip].resetTime.toString());
            return res.status(429).json({
                success: false,
                message,
                retryAfter: `${retryAfter} seconds`,
            });
        }
        // Set rate limit headers
        res.setHeader('X-RateLimit-Limit', max.toString());
        res.setHeader('X-RateLimit-Remaining', (max - rateLimitStore[ip].count).toString());
        res.setHeader('X-RateLimit-Reset', rateLimitStore[ip].resetTime.toString());
        // Call next() to continue to the next middleware/route handler
        return next();
    };
};
exports.rateLimit = rateLimit;
// Specific rate limiters for auth endpoints
exports.authLimiter = (0, exports.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs
    message: 'Too many login attempts, please try again after 15 minutes',
});
exports.apiLimiter = (0, exports.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per windowMs
});
//# sourceMappingURL=rateLimit.js.map