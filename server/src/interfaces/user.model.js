import { model, Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    apellido: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    rol: { type: Array, default: ["user"] },
    perfilIMG: { type: String, default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" },
    fondoIMG: { type: String, default: "https://512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Night-Thumb.jpg" },
    dateOfBirth: { type: Date },
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
