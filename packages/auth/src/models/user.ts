import { Document, Model, Schema, model } from 'mongoose';

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
  const a = plainPassword === this.password;
  return new Promise((resolve) => resolve(a));
};

/* istanbul ignore next */
userSchema.pre('save', async function (this: UserDoc) {
  if (this.isModified('password')) {
    this.password = this.password + 10;
  }
});

export const User = model<UserDoc, UserModel>('User', userSchema);