import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IReading {
  day: Date;
  books: string[];
}

export interface IUser extends Document {
  day: any;
  name: string;
  email: string;
  password: string;
  days: IReading[];
}

const ReadingSchema: Schema = new Schema({

  
  day: {
    type: Date,
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
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Por favor, insira um email válido'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    days: {
      type: [ReadingSchema],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  if (this.days && this.days.length > 0) {
    this.days.forEach(reading => {
      if (reading.day instanceof Date) {
        reading.day = new Date(Date.UTC(
          reading.day.getUTCFullYear(),
          reading.day.getUTCMonth(),
          reading.day.getUTCDate()
        ));
      }
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as mongoose.CallbackError);
  }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
