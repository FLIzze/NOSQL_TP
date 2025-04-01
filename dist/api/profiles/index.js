"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get("/", controller_1.getProfiles);
router.get("/:id", controller_1.getProfileById);
router.post("/", controller_1.createProfile);
router.put("/:id", controller_1.updateProfile);
router.delete("/:id", controller_1.deleteProfile);
router.post("/:id/experience", controller_1.addExperience);
router.delete("/:id/experience/:expId", controller_1.removeExperience);
router.post("/:id/skills", controller_1.addSkill);
router.delete("/:id/skills/:skill", controller_1.removeSkill);
router.put("/:id/information", controller_1.updateInformation);
exports.default = router;
