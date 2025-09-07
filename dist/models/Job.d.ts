import mongoose, { Document } from "mongoose";
export interface IJob extends Document {
    title: string;
    company: string;
    description: string;
    location: string;
    salary: string;
    postedDate: Date;
    deadline: Date;
    requirements: string[];
    benefits: string[];
    tags: string[];
    type: string;
    status: string;
    img?: string;
    isRemote?: boolean;
}
declare const _default: mongoose.Model<IJob, {}, {}, {}, mongoose.Document<unknown, {}, IJob, {}, {}> & IJob & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Job.d.ts.map