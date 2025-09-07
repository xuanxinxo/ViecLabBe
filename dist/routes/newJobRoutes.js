"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newJobController_js_1 = require("../controllers/newJobController.js");
const router = (0, express_1.Router)();
router.get("/", newJobController_js_1.getAllNewJobs);
router.get("/:id", newJobController_js_1.getNewJobById);
router.post("/", newJobController_js_1.createNewJob);
router.put("/:id", newJobController_js_1.updateNewJob);
router.delete("/:id", newJobController_js_1.deleteNewJob);
exports.default = router;
//# sourceMappingURL=newJobRoutes.js.map