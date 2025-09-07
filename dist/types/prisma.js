"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationInclude = void 0;
const client_1 = require("@prisma/client");
// Định nghĩa kiểu dữ liệu cho các bảng
const jobSelect = client_1.Prisma.validator()({
    id: true,
    title: true,
    company: true,
    location: true,
    type: true,
});
const hiringSelect = client_1.Prisma.validator()({
    id: true,
    title: true,
    company: true,
    location: true,
    type: true,
});
// Tạo kiểu dữ liệu cho include options
exports.applicationInclude = client_1.Prisma.validator()({
    job: { select: jobSelect },
    hiring: { select: hiringSelect },
});
//# sourceMappingURL=prisma.js.map