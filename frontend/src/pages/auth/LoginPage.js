import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/input/input";
import Title from "../../components/Title/Title";
import Button from "../../components/Title/Button";

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user, navigate, returnUrl]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <Title title="Iniciar Sesión" />
          <p className="text-gray-600 mb-6 text-center">
            ¡Bienvenido a nuestra biblioteca virtual!{" "}
          </p>
          <form onSubmit={handleSubmit(submit)} noValidate>
            <Input
              type="email"
              label="Username"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Email invalido",
                },
              })}
              error={errors.email}
            />
            <Input
              type="password"
              label="Password"
              {...register("password", {
                required: true,
              })}
              error={errors.password}
            />
            <Button
              type="submit"
              text="Ingresar"
              className="w-full bg-purple-500 text-white py-2 mt-4 rounded hover:bg-purple-700 transition duration-300"
            />
          </form>
          <div className="text-center mt-4">
            <p>-----or-----</p>
            <button className="w-full bg-red-500 text-white py-2 mt-2 rounded hover:bg-red-700 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-google inline-block align-middle mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
              </svg>{" "}
              <span className="inline-block align-middle">Ingresa con Google</span>
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Eres nuevo?{" "}
              <Link
                to={`/register${returnUrl ? "?returnUrl=" + returnUrl : ""}`}
                className="text-blue-500"
              >
                Registrate aqui
              </Link>
            </p>
          </div>
        </div>
        <div className="w-1/2 bg-purple-600 p-8 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-2xl font-bold">
            ¡Shhh!    Estás entrando en la guarida de los amantes de los libros.  Sumérgete en una lectura apasionante.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
