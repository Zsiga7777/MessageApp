import { Document, ObjectId, Schema } from 'mongoose';
export interface IProfile extends Document {
    age?: number,
    userId: Schema.Types.ObjectId;
}