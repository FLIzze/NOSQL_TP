import mongoose, { Schema, Document } from "mongoose";

export interface IExperience {
        _id?: mongoose.Types.ObjectId;  
        title: string;
        company: string;
        dates: string;
        description?: string;
}

export interface IInformation {
        bio?: string;
        location?: string;
        website?: string;
}

export interface IProfile extends Document {
        name: string;
        email: string;
        experience: IExperience[];
        skills: string[];
        information: IInformation;
}

const ProfileSchema = new Schema<IProfile>({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        experience: [
                {
                        _id: { type: Schema.Types.ObjectId, auto: true },
                        title: { type: String, required: true },
                        company: { type: String, required: true },
                        dates: { type: String, required: true },
                        description: { type: String },
                },
        ],
        skills: [{ type: String }],
        information: {
                bio: { type: String },
                location: { type: String },
                website: { type: String },
        },
});

export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
