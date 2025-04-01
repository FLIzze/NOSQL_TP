"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInformation = exports.removeSkill = exports.addSkill = exports.removeExperience = exports.addExperience = exports.deleteProfile = exports.updateProfile = exports.createProfile = exports.getProfileById = exports.getProfiles = void 0;
const model_1 = require("./model");
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skill, location } = req.query;
    const query = {};
    if (skill)
        query.skills = { $in: [skill] };
    if (location)
        query["information.location"] = location;
    try {
        const profiles = yield model_1.Profile.find(query);
        res.json(profiles);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getProfiles = getProfiles;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield model_1.Profile.findById(req.params.id);
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getProfileById = getProfileById;
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, skills, information } = req.body;
        if (!name || !email) {
            res.status(400).json({ message: "Name and email are required" });
            return;
        }
        const newProfile = new model_1.Profile({
            name,
            email,
            skills: skills || [],
            information: information || {},
            experience: [],
        });
        yield newProfile.save();
        res.status(201).json(newProfile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.createProfile = createProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const updatedProfile = yield model_1.Profile.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
        if (!updatedProfile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        res.json(updatedProfile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProfile = yield model_1.Profile.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        res.json({ message: "Profile deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.deleteProfile = deleteProfile;
const addExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, company, dates, description } = req.body;
        if (!title || !company || !dates) {
            res.status(400).json({ message: "All experience fields are required" });
            return;
        }
        const profile = yield model_1.Profile.findById(req.params.id);
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        const newExperience = { title, company, dates, description };
        profile.experience.push(newExperience);
        yield profile.save();
        res.status(201).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.addExperience = addExperience;
const removeExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield model_1.Profile.findById(req.params.id);
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        profile.experience = profile.experience.filter(exp => { var _a; return ((_a = exp._id) === null || _a === void 0 ? void 0 : _a.toString()) !== req.params.expId; });
        yield profile.save();
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.removeExperience = removeExperience;
const addSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield model_1.Profile.findById(req.params.id);
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        profile.skills.push(req.body.skill);
        yield profile.save();
        res.status(201).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.addSkill = addSkill;
const removeSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield model_1.Profile.findById(req.params.id);
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        profile.skills = profile.skills.filter(skill => skill !== req.params.skill);
        yield profile.save();
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.removeSkill = removeSkill;
const updateInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bio, location, website, skills } = req.body;
        const profile = yield model_1.Profile.findById(req.params.id);
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        profile.information = { bio, location, website };
        if (skills)
            profile.skills = skills;
        yield profile.save();
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.updateInformation = updateInformation;
