import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
type SchemaType = z.ZodSchema<any>;
export declare const validateRequest: (schema: SchemaType) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=validateRequest.d.ts.map