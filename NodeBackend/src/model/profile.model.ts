import { Schema, model } from 'mongoose';
import { IProfile } from '../interfaces/profile.interface';
const profileSchema = new Schema<IProfile>({
    age: { 
        type: Number,
        min: [0, 'Age cannot be negative'],
        required: [true, 'Age is required']
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'User ID is required'], 
        unique: true, 
        index: true,
    },
}, { timestamps: true });
export default model<IProfile>('Profile', profileSchema);