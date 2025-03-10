import { model, Schema } from 'mongoose';
import { TUser, UserInterfaceModel } from './user.interface';
import { Role, Status } from './user.constant';
import bcrypt from 'bcryptjs';
import config from '../../config';

const userSchema = new Schema<TUser, UserInterfaceModel>({
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
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: {
      values: Role,
      message: '{VALUE} is not supported',
    },
    default: 'user',
  },
  phone: { type: String, default: 'N/A' },
  address: { type: String, default: 'N/A' },
  city: { type: String, default: 'N/A' },
  country: { type: String, default: 'N/A' },
  postalCode: { type: String, default: 'N/A' },
  status: {
    type: String,
    enum: {
      values: Status,
      message: '{VALUE} is not supported',
    },
    required: true,
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Password hashed
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});

// post '' after save middleware in db
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatch = async function (password, hashed) {
  return await bcrypt.compare(password, hashed);
};

//check if user is deleted
userSchema.statics.isDeletedUser = async function (email: string) {
  const isDeleted = await this.findOne({ email, isDeleted: true });
  return isDeleted;
};

export const UserModel = model<TUser, UserInterfaceModel>('User', userSchema);
