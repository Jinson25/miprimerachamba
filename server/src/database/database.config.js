import { connect, set } from "mongoose";
import { UserModel } from "../interfaces/user.model.js";
import { BookModel } from "../interfaces/book.model.js";
import { data_biblioteca } from "../data.js";
import { data_users } from "../data.js";
import bcrypt from "bcryptjs";
const PASSWORD_HASH_SALT_ROUNDS = 10;
set("strictQuery", true);

export const connectDB = async () => {
  try {
    connect(process.env.MONGO_URI, {});
    await createUsers();
    await createBooks();
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

async function createUsers() {
  const userCount = await UserModel.countDocuments();
  if (userCount > 0) {
    console.log("Ya existen usuarios en la base de datos");
    return;
  }
  for (let user of data_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }
    console.log("Usuarios creados");
}

async function createBooks() {
    const bookCount = await BookModel.countDocuments();
    if (bookCount > 0) {
        console.log("Ya existen libros en la base de datos");
        return;
    }
    for (const book of data_biblioteca) {
        await BookModel.create(book);
    }
    console.log("Libros creados");
}
