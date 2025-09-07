import { Prisma } from '@prisma/client';
export declare const applicationInclude: {
    job: {
        select: {
            id: true;
            title: true;
            company: true;
            location: true;
            type: true;
        };
    };
    hiring: {
        select: {
            id: true;
            title: true;
            company: true;
            location: true;
            type: true;
        };
    };
};
export type ApplicationWithRelations = Prisma.ApplicationGetPayload<{
    include: typeof applicationInclude;
}>;
//# sourceMappingURL=prisma.d.ts.map