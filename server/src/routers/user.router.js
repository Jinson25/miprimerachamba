import { Router } from "express";
import jwt from "jsonwebtoken"; // Add the missing import statement for the jwt module
import { data_users } from "../data.js";
const router = Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = data_users.find(
        (user) => user.email === email && user.password === password
    );
    if (user) {
        res.send(generateTokenResponse(user));
        return;
    }

    res.status(401).send({ message: "Credenciales incorrectas" });
});

const generateTokenResponse = user => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        "SomeRandomText", // Fix the typo in the jwt.sign function
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