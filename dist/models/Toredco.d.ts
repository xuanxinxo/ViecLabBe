import mongoose, { Document } from 'mongoose';
export interface IToredco extends Document {
    name: string;
    description?: string;
    status: 'active' | 'inactive' | 'pending';
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IToredco, {}, {}, {}, mongoose.Document<unknown, {}, IToredco, {}, {}> & IToredco & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Toredco.d.ts.map