import React from "react";
import { useForm } from "react-hook-form";
import classes from "./ProfilePage.module.css";
import Input from "../../components/input/input";
import Title from "../../components/Title/Title";
import Button from "../../components/Title/Button";
import { useAuth } from "../../hooks/useAuth";


export default function ProfilePage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, updateProfile } = useAuth();

  const submit = (userData) => {
    updateProfile(userData);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Actualizar Perfil" />
        <form onSubmit={handleSubmit(submit)}>
          <Input
            defaultValue={user.name}
            type="text"
            label="Nombre"
            {...register("name", {
              required: true,
              minLength: 3,
            })}
            error={errors.name}
          />
          <Input
            defaultValue={user.apellido}
            type="text"
            label="Apellido"
            {...register("apellido", {
              required: true,
            })}
            error={errors.apellido}
          />

          <Button type="submit" text="Actualizar" backgroundColor="#009e84" />
        </form>

      </div>
    </div>
  );
}
