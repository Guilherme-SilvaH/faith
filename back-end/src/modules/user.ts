import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IReading {
  day: string;
  books: string[];
}

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  days: IReading[];
}

const ReadingSchema: Schema = new Schema({
  day: {
    type: String,
    required: true,
  },
  books: {
    type: [String],
    required: true,
    default: [],
  },
});

const UserSchema: Schema = new Schema(
  {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      unique: true,
      default: () => new mongoose.Types.ObjectId()
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Por favor, insira um email válido'],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: [ReadingSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);


UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next(); 

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next(); 
  } catch (error) {
    next(error as mongoose.CallbackError); 
  }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
