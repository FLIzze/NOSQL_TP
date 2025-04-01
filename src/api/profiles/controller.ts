import { Profile } from './model';
import { Request, Response } from "express";
import { IExperience } from './model';  

type AsyncHandler = (req: Request, res: Response) => Promise<void>;

export const getProfiles: AsyncHandler = async (req, res) => {
        const { skill, location } = req.query; 
        const query: Record<string, any> = {};

        if (skill) query.skills = { $in: [skill] };
        if (location) query["information.location"] = location;

        try {
                const profiles = await Profile.find(query);
                res.json(profiles);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const getProfileById: AsyncHandler = async (req, res) => {
        try {
                const profile = await Profile.findById(req.params.id);
                if (!profile) {
                        res.status(404).json({ message: "Profile not found" });
                        return;
                }
                res.json(profile); 
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const createProfile: AsyncHandler = async (req, res) => {
        try {
                const { name, email, skills, information } = req.body; 

                if (!name || !email) {
                        res.status(400).json({ message: "Name and email are required" });
                        return;
                }

                const newProfile = new Profile({
                        name,
                        email,
                        skills: skills || [], 
                        information: information || {}, 
                        experience: [],
                });

                await newProfile.save();
                res.status(201).json(newProfile);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const updateProfile: AsyncHandler = async (req, res) => {
        try {
                const { name, email } = req.body;
                const updatedProfile = await Profile.findByIdAndUpdate(
                        req.params.id,
                        { name, email },
                        { new: true }
                );

                if (!updatedProfile) {
                        res.status(404).json({ message: "Profile not found" });
                        return;
                }
                res.json(updatedProfile);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const deleteProfile: AsyncHandler = async (req, res) => {
        try {
                const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
                if (!deletedProfile) {
                        res.status(404).json({ message: "Profile not found" });
                        return;
                }
                res.json({ message: "Profile deleted" });
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const addExperience: AsyncHandler = async (req, res) => {
        try {
                const { title, company, dates, description } = req.body;
                if (!title || !company || !dates) {
                        res.status(400).json({ message: "All experience fields are required" });
                        return;
                }

                const profile = await Profile.findById(req.params.id);
                if (!profile) {
                        res.status(404).json({ message: "Profile not found" });
                        return;
                }

                const newExperience: IExperience = { title, company, dates, description };

                profile.experience.push(newExperience);
                await profile.save();

                res.status(201).json(profile);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const removeExperience: AsyncHandler = async (req, res) => {
        try {
                const profile = await Profile.findById(req.params.id);
                if (!profile) {
                        res.status(404).json({ message: "Profile not found" });
                        return;
                }

                profile.experience = profile.experience.filter(exp => exp._id?.toString() !== req.params.expId);
                await profile.save();
                res.json(profile);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const addSkill: AsyncHandler = async (req, res) => {
        try {
                const profile = await Profile.findById(req.params.id);
                if (!profile) {
                        res.status(404).json({ message: "Profile not found" });
                        return;
                }

                profile.skills.push(req.body.skill);
                await profile.save();
                res.status(201).json(profile);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const removeSkill: AsyncHandler = async (req, res) => {
        try {
                const profile = await Profile.findById(req.params.id);
                if (!profile) {
                        res.status(404).json({ message: "Profile not found" });
                        return;
                }

                profile.skills = profile.skills.filter(skill => skill !== req.params.skill);
                await profile.save();
                res.json(profile);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const updateInformation: AsyncHandler = async (req, res) => {
        try {
                const { bio, location, website, skills } = req.body; 
                const profile = await Profile.findById(req.params.id);
                if (!profile) {
                        res.status(404).json({ message: "Profile not found" });
                        return;
                }

                profile.information = { bio, location, website };
                if (skills) profile.skills = skills;

                await profile.save();
                res.json(profile);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

