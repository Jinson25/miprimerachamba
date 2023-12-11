import React from "react";
import { useForm } from "react-hook-form";
import Input from "../input/input";
import Title from "../Title/Title";
import Button from "../Title/Button";
import { useAuth } from "../../hooks/useAuth";

export default function ChangePassword() {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const { changePassword } = useAuth();
    const submit = (passwords) => {
        changePassword(passwords);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
            <Title title="Cambiar Contraseña" />
                <Input
                    type="password"
                    label="Contraseña Actual"
                    {...register("currentPassword", {
                        required: true,
                    })}
                    error={errors.currentPassword}
                />

                <Input
                    type="password"
                    label="Nueva Contraseña"
                    {...register("newPassword", {
                        required: true,
                        minLength: 5,
                    })}
                    error={errors.newPassword}
                />

                <Input
                    type="password"
                    label="Confirmar Nueva Contraseña"
                    {...register("confirmNewPassword", {
                        required: true,
                        validate: (value) =>
                            value !== getValues("newPassword")
                                ? "Las contraseñas no coinciden"
                                : true,
                    })}
                    error={errors.confirmNewPassword}
                />

                <Button type="submit" text="Cambiar" />
            </form>
        </div>
    );
}
