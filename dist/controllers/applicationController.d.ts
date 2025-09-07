import { Request, Response } from "express";
type AuthenticatedRequest = Request & {
    user?: {
        email: string;
        id: string;
    };
};
export declare const getApplications: (req: Request, res: Response) => Promise<Response>;
export declare const getMyApplications: (req: AuthenticatedRequest, res: Response) => Promise<Response>;
export declare const createApplication: (req: Request, res: Response) => Promise<Response>;
export declare const getApplicationById: (req: Request, res: Response) => Promise<Response>;
export declare const updateApplication: (req: Request, res: Response) => Promise<Response>;
export declare const deleteApplication: (req: Request, res: Response) => Promise<Response>;
export {};
//# sourceMappingURL=applicationController.d.ts.map