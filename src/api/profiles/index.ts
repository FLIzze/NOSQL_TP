import express from 'express';
import {
        getProfiles,
        getProfileById,
        createProfile,
        updateProfile,
        deleteProfile,
        addExperience,
        removeExperience,
        addSkill,
        removeSkill,
        updateInformation,
} from './controller';

const router = express.Router();

router.get("/", getProfiles); 
router.get("/:id", getProfileById); 
router.post("/", createProfile); 
router.put("/:id", updateProfile); 
router.delete("/:id", deleteProfile); 

router.post("/:id/experience", addExperience); 
router.delete("/:id/experience/:expId", removeExperience); 

router.post("/:id/skills", addSkill); 
router.delete("/:id/skills/:skill", removeSkill); 

router.put("/:id/information", updateInformation); 

export default router;
