"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newJobController_1 = require("../controllers/newJobController");
const router = (0, express_1.Router)();
router.get("/", newJobController_1.getAllNewJobs);
router.get("/:id", newJobController_1.getNewJobById);
router.post("/", newJobController_1.createNewJob);
router.put("/:id", newJobController_1.updateNewJob);
router.delete("/:id", newJobController_1.deleteNewJob);
exports.default = router;
//# sourceMappingURL=newJobRoutes.js.map