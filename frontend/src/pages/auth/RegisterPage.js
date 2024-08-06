import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/input/input";
import Title from "../../components/Title/Title";
import Button from "../../components/Title/Button";

export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user, navigate, returnUrl]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    await auth.register(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <Title title="Registro" />
          <p className="text-gray-600 mb-6 text-center">
            ¡Únete a nuestra comunidad de lectores!
          </p>
          <form onSubmit={handleSubmit(submit)} noValidate>
            <Input
              type="text"
              label="Nombre"
              {...register("name", {
                required: true,
                minLength: 5,
              })}
              error={errors.name}
            />
            <Input
              type="email"
              label="Correo Electrónico"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Email inválido",
                },
              })}
              error={errors.email}
            />
            <Input
              type="password"
              label="Contraseña"
              {...register("password", {
                required: true,
                minLength: 5,
              })}
              error={errors.password}
            />
            <Input
              type="password"
              label="Confirmar Contraseña"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value !== getValues("password")
                    ? "Las contraseñas no coinciden"
                    : true,
              })}
              error={errors.confirmPassword}
            />
            <Button
              type="submit"
              text="Registrarse"
              className="w-full bg-purple-500 text-white py-2 mt-4 rounded hover:bg-purple-700 transition duration-300"
            />
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link
                to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}
                className="text-blue-500"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
        <div className="w-1/2 bg-purple-600 p-8 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-2xl font-bold">
              ¡Únete a nuestra comunidad y disfruta de una lectura sin límites!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
