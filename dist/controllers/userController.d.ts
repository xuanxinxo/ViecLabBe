import { Request, Response } from 'express';
export declare const register: (req: Request, res: Response) => Promise<Response>;
export declare const login: (req: Request, res: Response) => Promise<Response>;
export declare const getCurrentUser: (req: Request, res: Response) => Promise<Response>;
export declare const verifyEmail: (req: Request, res: Response) => Promise<Response>;
export declare const forgotPassword: (req: Request, res: Response) => Promise<Response>;
export declare const resetPassword: (req: Request, res: Response) => Promise<Response>;
export declare const refreshToken: (req: Request, res: Response) => Promise<Response>;
export declare const logout: (req: Request, res: Response) => Promise<Response>;
export declare const updateUser: (req: Request, res: Response) => Promise<Response>;
export declare const deleteUser: (req: Request, res: Response) => Promise<Response>;
//# sourceMappingURL=userController.d.ts.map