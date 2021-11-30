import { Document, Model, Schema, model } from 'mongoose';

export interface UserAttrs {
  email: string;
  password: string;
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
  }
});

export const User = model<UserDoc, UserModel>('User', userSchema);

userSchema.statics['build'] = (attrs: UserAttrs) => {
  return new User(attrs);
};

// TODO remove below code

export interface UserPayload {
  email: string;
  password: string;
}

export interface UserData extends UserPayload {
  refreshToken: string;
}

export const users: UserData[] = [];
