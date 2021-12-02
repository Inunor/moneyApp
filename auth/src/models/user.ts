import { Document, Model, Schema, model } from 'mongoose';

export interface UserPayload {
  email: string;
  password: string;
}

interface UserAttrs extends UserPayload {
  refreshToken: string;
}

interface UserDoc extends UserAttrs, Document {}

interface UserModel extends Model<UserDoc> {
  build(user: UserAttrs): UserDoc;
}

const userSchema = new Schema<UserDoc, UserModel>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // TODO own schema for refreshToken
  refreshToken: {
    type: String,
    required: true
  }
});

userSchema.statics['build'] = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = model<UserDoc, UserModel>('User', userSchema);
