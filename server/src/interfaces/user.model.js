import { model, Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    apellido: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    rol: { type: Array, default: ["user"] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const UserModel = model("User", UserSchema);
