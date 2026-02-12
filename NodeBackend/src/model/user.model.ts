import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
const userSchema = new Schema<IUser>({
  password: {
    type: String,
    minlength: [6, 'Password should have at least 6 characters'],
    required: [true, 'Password is required'],
    select: false,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(v: string) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  OTPCode: {
    type: String,
    select: false,
  },
  OTPCodeExpires: {
    type: Number,
    select: false,
  },
  passwordResetCode: {
    type: String,
    select: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Role is required'],
  },
}, { timestamps: true });
export default model<IUser>('User', userSchema);