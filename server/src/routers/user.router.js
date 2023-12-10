import { Router } from "express";
import jwt from "jsonwebtoken"; // Add the missing import statement for the jwt module
const router = Router();
import handler from "express-async-handler";
import { UserModel } from "../interfaces/user.model.js";
import bcrypt from "bcryptjs";

router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      res.send(generateTokenResponse(user));
      return;
    }

    res.status(401).send( "Credenciales incorrectas");
  })
);

const generateTokenResponse = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    token,
  };
};
export default router;
