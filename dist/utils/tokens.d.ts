import jwt from 'jsonwebtoken';
export declare const generateAccessToken: (userId: string, email: string, role: string) => string;
export declare const generateRefreshToken: (userId: string) => string;
export declare const generateRandomToken: (bytes?: number) => string;
export declare const verifyToken: (token: string, isRefreshToken?: boolean) => string | jwt.JwtPayload | null;
export declare const getTokenExpiration: (minutes?: number) => Date;
//# sourceMappingURL=tokens.d.ts.map