import { Request, Response } from 'express';
export declare const uploadImage: (req: Request, res: Response) => Promise<Response>;
export declare const uploadImages: (req: Request, res: Response) => Promise<Response>;
export declare const uploadMiddleware: (import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> | ((error: any, req: Request, res: any, next: any) => any))[];
//# sourceMappingURL=uploadController.d.ts.map