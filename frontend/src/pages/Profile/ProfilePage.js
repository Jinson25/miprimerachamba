import React from "react";
import { useForm } from "react-hook-form";
import classes from "./ProfilePage.module.css";
import Input from "../../components/input/input";
import Title from "../../components/Title/Title";
import Button from "../../components/Title/Button";
import { useAuth } from "../../hooks/useAuth";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

export default function ProfilePage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, updateProfile} = useAuth();

  const submit = (userData) => {
    updateProfile(userData);
  };

  console.log("Perfil IMG:", user.perfilIMG);

  return (
    <div className={classes.container}>
      {/* Tarjeta de Usuario a la Izquierda */}
      <div className={classes.userCard}>
        {/* Puedes agregar la foto de perfil aquí */}
        <img
          src={
            user.perfilIMG ??
            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          alt="Profile"
          className={classes.profilePicture}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
          }}
        />

        <p>Nombre: {user.name}</p>
        <p>Apellido: {user.apellido}</p>
        <p>Email: {user.email}</p>
        {/* Puedes mostrar más detalles del usuario según tus necesidades */}
      </div>

      {/* Formulario de Actualización de Perfil a la Derecha */}
      <div className={classes.details}>
        <form onSubmit={handleSubmit(submit)}>
          <Title title="Actualizar Perfil" />
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
          <Input
            defaultValue={user.email}
            type="email"
            label="Email"
            {...register("email", {
              required: true,
            })}
            error={errors.email}
          />
          <Button type="submit" text="Actualizar" backgroundColor="#009e84" />
        </form>

        {/* Componente de Cambio de Contraseña */}
        <ChangePassword />
      </div>
    </div>
  );
}
