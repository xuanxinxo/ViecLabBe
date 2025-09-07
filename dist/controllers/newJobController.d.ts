import { Request, Response } from "express";
export declare const getAllNewJobs: (_req: Request, res: Response) => Promise<void>;
export declare const getNewJobById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createNewJob: (req: Request, res: Response) => Promise<void>;
export declare const updateNewJob: (req: Request, res: Response) => Promise<void>;
export declare const deleteNewJob: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=newJobController.d.ts.map