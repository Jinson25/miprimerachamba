import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import classes from "./authPage.module.css";
import Input from "../../components/input/input";
import Title from "../../components/Title/Title";
import Button from "../../components/Title/Button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const auth = useAuth();
  const {user} = auth;
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

  const submit = async data => {
    await auth.register(data);
  };

  return (
    <div className={classes.authContainer}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />
          <Input
            type="email"
            label="Email"
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
              minLength: 5,
            })}
            error={errors.password}
          />
          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value !== getValues("password")
                  ? "las contraseñas no coinciden"
                  : true,
            })}
            error={errors.confirmPassword}
          />
          <Button type="submit" text="Register"></Button>
          <div className={classes.register}>
            Ya tienes cuenta? &nbsp;
            <Link to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
              Inicia sesion aqui
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
