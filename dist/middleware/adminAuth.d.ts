import { Request, Response, NextFunction } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: string;
        username: string;
        role: string;
    };
}
export declare const adminAuth: (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=adminAuth.d.ts.map