import { Request, Response, NextFunction } from 'express';
export declare const cacheMiddleware: (duration?: number) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const clearCache: (pattern?: string) => void;
//# sourceMappingURL=cache.d.ts.map