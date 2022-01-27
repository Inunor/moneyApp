import { Document, Model, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserPayload {
  email: string;
  password: string;
}

interface UserAttrs extends UserPayload {
  refreshToken: string;
}

interface UserDoc extends UserAttrs, Document {
  validatePassword(this: UserDoc, plainPassword: string): Promise<boolean>;
}

interface UserModel extends Model<UserDoc> {
  build(user: UserAttrs): UserDoc;
}

const userSchema = new Schema<UserDoc, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  }
});

userSchema.statics['build'] = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.methods['validatePassword'] = async function validatePassword(
  this: UserDoc,
  plainPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, this.password);
};

/* istanbul ignore next */
userSchema.pre('save', async function (this: UserDoc) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
});

export const User = model<UserDoc, UserModel>('User', userSchema);
