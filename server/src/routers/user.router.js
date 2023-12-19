import { Router } from "express";
import jwt from "jsonwebtoken";
const router = Router();
import handler from "express-async-handler";
import { UserModel } from "../interfaces/user.model.js";
import bcrypt from "bcryptjs";
import auth from "../middleware/auth.mid.js";
const PASSWORD_HASH_SALT_ROUNDS = 10;

router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
      return;
    }

    res.status(401).send("Credenciales incorrectas");
  })
);
router.post(
  "/register",
  handler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(400).send("Las contraseñas no coinciden");
      return;
    }

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      res.status(400).send("El usuario ya existe");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      PASSWORD_HASH_SALT_ROUNDS
    );

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    };

    const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result));
  })
);
//obtener todos los usuarios
router.get(
  "/",
  auth,
  handler(async (req, res) => {
    const users = await UserModel.find({});
    res.send(users);
  })
);

//obtener usuario por id
router.get(
  "/:userId",
  auth,
  handler(async (req, res) => {
    const { userId } = req.params;
    const user = await UserModel.findOne({ _id: userId });
    res.send(user);
  })
);

// Elimina todos los documentos en la colección de usuarios
router.delete(
  "/deleteAll",
  auth,
  handler(async (req, res) => {
    await UserModel.deleteMany({});

    res.send({
      message: "Todos los usuarios han sido eliminados correctamente.",
    });
  })
);

// Elimina un usuario por su id
router.delete(
  "/:userId",
  auth,
  handler(async (req, res) => {
    const { userId } = req.params;
    await UserModel.deleteOne({ _id: userId });
    res.send({ message: "El usuario ha sido eliminado correctamente." });
  })
);

//actualizar usuario por id
router.put(
  "/:userId",
  auth,
  handler(async (req, res) => {
    const updateUser = req.body;
    const userId = req.params.userId;
    const result = await UserModel.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });
    res.send(result);
  })
);

//actualizar usuario perfil
router.put(
  "/updateProfile",
  auth,
  handler(async (req, res) => {
    const { name, apellido, email, dateOfBirth, perfilIMG } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { name, apellido, email, dateOfBirth, perfilIMG },
      { new: true }
    );
    res.send(generateTokenResponse(user));
  })
);

//cambiar contraseña
router.put(
  "/changePassword",
  auth,
  handler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(404).send("¡Error al cambiar la contraseña!");
      return;
    }
    const equal = await bcrypt.compare(currentPassword, user.password);
    if (!equal) {
      res.status(401).send("¡La contraseña actual no es correcta!");
      return;
    }
    user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
    await user.save();
    res.send("¡Contraseña actualizada!");
  })
);

//buscar usuario por email correo y nombre
router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");
    const users = await UserModel.find({
      $or: [
        { name: { $regex: searchRegex } },
        { apellido: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    });
    res.send(users);
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
    apellido: user.apellido,
    isAdmin: user.isAdmin,
    token,
  };
};
export default router;
